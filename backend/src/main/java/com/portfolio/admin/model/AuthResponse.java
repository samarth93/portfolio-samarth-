package com.portfolio.admin.model;

public class AuthResponse {
    
    private boolean authenticated;
    private String message;
    private String token;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(boolean authenticated, String message) {
        this.authenticated = authenticated;
        this.message = message;
    }
    
    public AuthResponse(boolean authenticated, String message, String token) {
        this.authenticated = authenticated;
        this.message = message;
        this.token = token;
    }
    
    // Getters and Setters
    public boolean isAuthenticated() {
        return authenticated;
    }
    
    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
} 