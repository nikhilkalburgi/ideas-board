# Backend Dockerfile (Node.js + Express + GraphQL)
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

EXPOSE 4000

CMD ["node", "server.js"]
