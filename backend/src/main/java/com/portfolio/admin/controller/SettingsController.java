package com.portfolio.admin.controller;

import com.portfolio.admin.model.Settings;
import com.portfolio.admin.model.AuthResponse;
import com.portfolio.admin.service.SettingsService;
import com.portfolio.admin.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/settings")
public class SettingsController {

    @Autowired
    private SettingsService settingsService;

    @Autowired
    private AuthService authService;

    /**
     * Get current settings (public endpoint - anyone can view)
     */
    @GetMapping
    public ResponseEntity<Settings> getSettings() {
        try {
            Settings settings = settingsService.getSettings();
            return ResponseEntity.ok(settings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update settings (protected endpoint - admin only)
     */
    @PutMapping
    public ResponseEntity<Settings> updateSettings(
            @Valid @RequestBody Settings settings,
            @RequestHeader("Authorization") String token) {
        try {
            // Validate admin token
            if (!isValidToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            Settings updatedSettings = settingsService.updateSettings(settings);
            return ResponseEntity.ok(updatedSettings);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Token validation helper
    private boolean isValidToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        AuthResponse response = authService.validateSession(token);
        return response.isAuthenticated();
    }
}
