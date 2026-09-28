# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests package



CMD ["sh", "-c", "echo ' _       __          __        __' && \
    echo '| |     / /___  ____/ /__     / /' && \
    echo '| | /| / / __ \\/ __  / _ \\   / /' && \
    echo '| |/ |/ / /_/ / /_/ /  __/  /_/' && \
    echo '|__/|__/\\____/\\__,_/\\___/  (_)' && \
    echo '' && \
    echo '🚀 WOC (World of Chewing Gum) Backend gestartet!' && \
    exec java -jar app.jar"]


# Runtime stage
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
