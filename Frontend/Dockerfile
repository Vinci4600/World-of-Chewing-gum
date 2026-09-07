# Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN npm ci --include=dev

RUN npm list vite

COPY . .
RUN npm run build

# Runtime stage
RUN node node_modules/vite/bin/vite.js build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
