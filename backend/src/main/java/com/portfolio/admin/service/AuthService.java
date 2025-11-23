package com.portfolio.admin.service;

import com.portfolio.admin.model.AuthResponse;
import com.portfolio.admin.model.User;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class AuthService {

    // Admin credentials loaded from environment variables
    // WARNING: For production, consider using Spring Security with proper
    // authentication
    // Set ADMIN_USERNAME and ADMIN_PASSWORD environment variables to override these
    // defaults
    // For production deployment, ALWAYS set these via environment variables in
    // Render
    private static final String ADMIN_USERNAME = System.getenv().getOrDefault("ADMIN_USERNAME", "Bhou");
    private static final String ADMIN_PASSWORD = System.getenv().getOrDefault("ADMIN_PASSWORD", "Billu#1234");

    // Simple in-memory token storage
    // NOTE: Tokens do not expire in this implementation
    // For production, consider implementing token expiration and refresh tokens
    private final ConcurrentMap<String, String> activeTokens = new ConcurrentHashMap<>();

    public AuthResponse authenticate(User user) {
        if (user == null || user.getUsername() == null || user.getPassword() == null) {
            return new AuthResponse(false, "Username and password are required");
        }

        if (ADMIN_USERNAME.equals(user.getUsername()) && ADMIN_PASSWORD.equals(user.getPassword())) {
            // Generate a simple token
            String token = UUID.randomUUID().toString();
            activeTokens.put(token, user.getUsername());

            return new AuthResponse(true, "Authentication successful", token);
        } else {
            return new AuthResponse(false, "Invalid username or password");
        }
    }

    public boolean isValidToken(String token) {
        return token != null && activeTokens.containsKey(token);
    }

    public String getUsernameFromToken(String token) {
        return activeTokens.get(token);
    }

    public boolean logout(String token) {
        if (token != null && activeTokens.containsKey(token)) {
            activeTokens.remove(token);
            return true;
        }
        return false;
    }

    public AuthResponse validateSession(String token) {
        if (isValidToken(token)) {
            return new AuthResponse(true, "Session is valid", token);
        } else {
            return new AuthResponse(false, "Session has expired or is invalid");
        }
    }
}