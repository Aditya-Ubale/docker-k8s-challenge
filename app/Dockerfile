# ---------- Stage 1: install production dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---------- Stage 2: small runtime image ----------
FROM node:20-alpine
ENV NODE_ENV=production \
    PORT=3000
WORKDIR /app

# Copy only what is needed to run
COPY --from=deps /app/node_modules ./node_modules
COPY package.json server.js ./

# Run as the non-root user that ships with the node image
USER node

EXPOSE 3000

# Container-level health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
