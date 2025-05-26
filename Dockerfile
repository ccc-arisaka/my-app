# Use official Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy everything else and build
COPY . .
RUN npm run build

# Run stage
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 8080

ENV PORT=8080

CMD ["npm", "start"]
