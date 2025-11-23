package com.portfolio.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class AdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Read allowed origins from environment variable
                // Format: comma-separated list, e.g.,
                // "https://your-app.onrender.com,http://localhost:3000"
                String allowedOrigins = System.getenv("ALLOWED_ORIGINS");

                String[] origins;
                if (allowedOrigins != null && !allowedOrigins.trim().isEmpty()) {
                    origins = allowedOrigins.split(",");
                } else {
                    // Default to localhost for local development
                    origins = new String[] { "http://localhost:3000", "http://127.0.0.1:3000" };
                }

                registry.addMapping("/**")
                        .allowedOrigins(origins)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}