# syntax=docker/dockerfile:1

# ============================================================================
# ZOE — Next.js production image (multi-stage)
#
# Uses Next.js `standalone` output (see next.config.ts) so the runtime image
# ships only the compiled server + its traced node_modules — small and fast.
# ============================================================================

# ── deps: install dependencies ─────────────────────────────────────────────
FROM node:24-alpine AS deps
WORKDIR /app
# libc compat for native addons (e.g. pg) on Alpine.
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# ── builder: build the app ─────────────────────────────────────────────────
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# DATABASE_URL is not needed at build time; the client throws only at runtime.
ENV NEXT_TELEMETRY_DISABLED=1
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
