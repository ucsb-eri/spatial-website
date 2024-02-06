# Stage 1: Build the app
FROM node AS builder

WORKDIR /app

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Install client dependencies
COPY client/package*.json ./client/
RUN cd client && npm install

# Build client app
COPY client/ ./client/
RUN cd client && npm run build

# Copy server files and built client app
COPY server/ ./server/
COPY --from=builder /app/client/build /app/server/public

# Stage 2: Setup with Nginx or just run Node.js server
FROM node:14

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000
CMD ["node", "server/server.js"]
