# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including Angular Universal ones)
# Skip strict peer resolution
RUN npm install --legacy-peer-deps

# Copy everything
COPY . .

# Build SSR Angular app (client + server bundles)
RUN npm run build:ssr

# Expose port
EXPOSE 4000

# Run the SSR server
CMD ["node", "dist/surveynews/server/server.mjs"]
