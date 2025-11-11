# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock bunfig.toml ./

# Install dependencies
RUN bun install

# Copy source files
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1-slim AS runtime

WORKDIR /app

# Copy built application and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose the default Astro port
EXPOSE 4321

# Set environment to production
ENV HOST=0.0.0.0
ENV PORT=4321

# Start the application
CMD ["bun", "run", "preview", "--host", "0.0.0.0"]
