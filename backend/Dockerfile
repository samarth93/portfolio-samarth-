# Multi-stage Dockerfile: build with Maven image, run with lightweight OpenJDK

# Build stage: use an official Maven image with JDK 21 to compile and package the app
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /workspace

# Copy pom first and fetch dependencies (speeds up rebuilds)
COPY pom.xml ./
RUN mvn -B -DskipTests dependency:go-offline

# Copy source and build
COPY src ./src
RUN mvn -B -DskipTests clean package

# Runtime stage: lightweight OpenJDK
FROM openjdk:21-jdk-slim
WORKDIR /app

# Copy the packaged jar from the build stage (wildcard matches the artifact name)
COPY --from=build /workspace/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Default environment values
ENV SPRING_PROFILES_ACTIVE=production
ENV SERVER_PORT=8080

# Run the application
CMD ["sh", "-c", "java -jar /app/app.jar"]