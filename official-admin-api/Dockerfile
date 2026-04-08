# syntax=docker/dockerfile:1

FROM maven:3.9.9-eclipse-temurin-17 AS builder
WORKDIR /build

COPY pom.xml ./
COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre AS runtime
WORKDIR /app

COPY --from=builder /build/target/*.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
