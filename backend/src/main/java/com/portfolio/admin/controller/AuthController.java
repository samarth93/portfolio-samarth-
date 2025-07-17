package com.portfolio.admin.controller;

import com.portfolio.admin.model.AuthResponse;
import com.portfolio.admin.model.User;
import com.portfolio.admin.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody User user) {
        AuthResponse response = authService.authenticate(user);
        
        if (response.isAuthenticated()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout(@RequestHeader("Authorization") String token) {
        // Remove "Bearer " prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        
        boolean success = authService.logout(token);
        
        if (success) {
            return ResponseEntity.ok(new AuthResponse(true, "Logout successful"));
        } else {
            return ResponseEntity.badRequest().body(new AuthResponse(false, "Invalid token"));
        }
    }
    
    @GetMapping("/validate")
    public ResponseEntity<AuthResponse> validateSession(@RequestHeader("Authorization") String token) {
        // Remove "Bearer " prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        
        AuthResponse response = authService.validateSession(token);
        
        if (response.isAuthenticated()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    
    @GetMapping("/status")
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.ok("Auth service is running");
    }
} 