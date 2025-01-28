# Base image
FROM node:16.17.0-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install ajv@8.12.0 ajv-keywords@5.1.0 --save-exact 
RUN npm install --legacy-peer-deps

# Copy all project files (this includes package.json, src, public, etc.)
COPY . .

# Build the application
RUN npm run build

# Final image
FROM node:16.17.0-alpine
WORKDIR /app

# Copy built files and node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
