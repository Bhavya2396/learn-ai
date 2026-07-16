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
# IMPORTANT: NEXT_PUBLIC_* vars are inlined into the CLIENT bundle at BUILD time
# (not read at runtime). The Firebase client config MUST be present here or the
# browser ships with no Firebase config and Google sign-in won't work. Pass them
# as build args (docker build --build-arg / compose build.args), e.g.:
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
# NOTE: migrations are NOT run here — they must run against the LIVE database at
# deploy time, not baked into the image. Use the `migrate` stage below (wired as
# a one-off `migrate` service in docker-compose.yml). The app just serves.
CMD ["node", "server.js"]

# ── migrate: one-off DB migration runner ───────────────────────────────────
# A separate, tiny image that has drizzle-kit + the config + the migration SQL.
# Run it ONCE per deploy against the live DB (with DATABASE_URL in the env),
# BEFORE starting/upgrading the app:
#   docker compose run --rm migrate
# It exits when migrations are applied; it does not serve anything.
FROM node:24-alpine AS migrate
WORKDIR /app
RUN apk add --no-cache libc6-compat
# node_modules (incl. drizzle-kit) + only the files migrate needs.
COPY --from=deps /app/node_modules ./node_modules
COPY package.json drizzle.config.ts ./
COPY src/lib/db ./src/lib/db
ENV NODE_ENV=production
CMD ["npm", "run", "db:migrate"]
