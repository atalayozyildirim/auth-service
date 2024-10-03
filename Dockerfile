# Base image
ARG NODE_VERSION=20.14.0
FROM node:${NODE_VERSION} AS base

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Development image
FROM base AS dev

# Copy the rest of the source files
COPY . .

# Install development dependencies
RUN npm install --only=dev

# Generate Prisma Client
RUN npx prisma generate

# Build the TypeScript code
RUN npm run build

# Production image
FROM base AS final

# Use production node environment by default.
ENV NODE_ENV production

# Run the application as a non-root user.
USER node

# Copy the production dependencies from the dev stage and also
# the built application from the dev stage into the image.
COPY --from=dev /usr/src/app/node_modules ./node_modules
COPY --from=dev /usr/src/app/dist ./dist
COPY --from=dev /usr/src/app/prisma ./prisma

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "run", "serve"]