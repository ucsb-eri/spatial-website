# Stage 1: Build the app
FROM node:20 AS builder

WORKDIR /app

# Install dependencies for both server and client
COPY server/package*.json ./server/
COPY client/package*.json ./client/

RUN npm install --prefix server
RUN npm install --prefix client

# Build client app
COPY client/ ./client/
RUN npm run build --prefix client

# Copy server files
COPY server/ ./server/

# Stage 2: Setup the final image
FROM node:20

WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/server /app/server
COPY --from=builder /app/client/build /app/server/public

EXPOSE 3000
CMD ["node", "server/server.js"]
