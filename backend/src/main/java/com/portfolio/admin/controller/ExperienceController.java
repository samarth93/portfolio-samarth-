package com.portfolio.admin.controller;

import com.portfolio.admin.model.Experience;
import com.portfolio.admin.service.AuthService;
import com.portfolio.admin.service.ExperienceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/experiences")
public class ExperienceController {
    
    @Autowired
    private ExperienceService experienceService;
    
    @Autowired
    private AuthService authService;
    
    // Public endpoint - no authentication required
    @GetMapping
    public ResponseEntity<List<Experience>> getAllExperiences() {
        List<Experience> experiences = experienceService.getAllExperiences();
        return ResponseEntity.ok(experiences);
    }
    
    // Public endpoint - no authentication required
    @GetMapping("/{id}")
    public ResponseEntity<Experience> getExperienceById(@PathVariable String id) {
        Optional<Experience> experience = experienceService.getExperienceById(id);
        return experience.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Admin endpoint - authentication required
    @PostMapping
    public ResponseEntity<?> createExperience(@Valid @RequestBody Experience experience,
                                              @RequestHeader("Authorization") String token) {
        if (!isAuthenticated(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        
        Experience createdExperience = experienceService.createExperience(experience);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdExperience);
    }
    
    // Admin endpoint - authentication required
    @PutMapping("/{id}")
    public ResponseEntity<?> updateExperience(@PathVariable String id,
                                              @Valid @RequestBody Experience experience,
                                              @RequestHeader("Authorization") String token) {
        if (!isAuthenticated(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        
        Optional<Experience> updatedExperience = experienceService.updateExperience(id, experience);
        return updatedExperience.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Admin endpoint - authentication required
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExperience(@PathVariable String id,
                                              @RequestHeader("Authorization") String token) {
        if (!isAuthenticated(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        
        boolean deleted = experienceService.deleteExperience(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Experience deleted successfully"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Admin endpoint - authentication required
    @GetMapping("/count")
    public ResponseEntity<?> getExperienceCount(@RequestHeader("Authorization") String token) {
        if (!isAuthenticated(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        
        long count = experienceService.getExperienceCount();
        return ResponseEntity.ok(Map.of("count", count));
    }
    
    private boolean isAuthenticated(String token) {
        if (token == null) return false;
        
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        
        return authService.isValidToken(token);
    }
} 