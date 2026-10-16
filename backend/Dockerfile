
FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw && ./mvnw -DskipTests package

EXPOSE 8083

CMD ["sh", "-c", "java -Dserver.port=${PORT:-8083} -jar target/*.jar"]
