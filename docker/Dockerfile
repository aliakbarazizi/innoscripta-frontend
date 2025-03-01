FROM node:21.1 AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Set the working directory
WORKDIR /app

# Enable the corepack
RUN corepack enable

# To use layer cache, first copy pnmp-lock.yaml and fetch the dependencies
# pnpm fetch does require only lockfile
# COPY .npmrc package.json pnpm-lock.yaml .pnpmfile.cjs ./
COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch

# then copy the source code
COPY . ./
RUN pnpm install --offline

# Build the application
RUN pnpm vite build

FROM nginx:1.27.3-alpine

# Copy the nginx configuration
COPY docker/config/conf.d /etc/nginx/conf.d/

# Copy the build files to the nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start the server
CMD ["nginx", "-g", "daemon off;"]
