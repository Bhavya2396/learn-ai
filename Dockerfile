# syntax=docker/dockerfile:1

# ============================================================================
# ZOE — Next.js production image (multi-stage)
#
# Uses Next.js `standalone` output (see next.config.ts) so the runtime image
# ships only the compiled server + its traced node_modules — small and fast.
# ============================================================================

# ── builder: install deps + build (one stage — no node_modules shuffling) ──
# Keeping install + build in ONE stage avoids copying the 1.2GB node_modules
# between stages (that COPY alone was ~2 min). The npm cache mount makes repeat
# `npm ci` near-instant. Only the tiny standalone output leaves this stage.
FROM node:24-alpine AS builder
WORKDIR /app
# libc compat for native addons (e.g. pg) on Alpine.
RUN apk add --no-cache libc6-compat
# Install first, on package files only, so the layer caches unless deps change.
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
# Now the source. (.dockerignore keeps node_modules/.next/.git out of context.)
COPY . .
# Run DB migrations right after install. DATABASE_URL comes from compose
# build.args and must be reachable during the build.
ARG DATABASE_URL
RUN npm run db:migrate
ENV NEXT_TELEMETRY_DISABLED=1
# NEXT_PUBLIC_* are inlined into the client bundle at build time (passed from
# compose build.args).
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY \
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN \
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID \
    NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID
RUN npm run build

# ── runner: minimal production runtime ─────────────────────────────────────
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as an unprivileged user.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Public assets and the standalone server output.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# server.js is emitted by Next's standalone output.
CMD ["node", "server.js"]
