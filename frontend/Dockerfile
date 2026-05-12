FROM node:22-alpine

# Install dependencies needed for native builds
RUN apk update && apk add --no-cache \
    git \
    curl \
    bash \
    python3 \
    make \
    g++

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Delete package-lock.json and reinstall cleanly
RUN rm -f package-lock.json && npm install

# Copy the rest of the project
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server accessible from outside container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]