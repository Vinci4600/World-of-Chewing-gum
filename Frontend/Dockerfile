# Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build










CMD ["sh", "-c", "echo ' _       __          __        __' && \
    echo '| |     / /___  ____/ /__     / /' && \
    echo '| | /| / / __ \\/ __  / _ \\   / /' && \
    echo '| |/ |/ / /_/ / /_/ /  __/  /_/' && \
    echo '|__/|__/\\____/\\__,_/\\___/  (_)' && \
    echo '' && \
    echo '🚀 WOC Frontend (World of Chewing Gum) Frontend wurde  gestartet!' && \
    exec java -jar app.jar"]


# Runtime stage
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
