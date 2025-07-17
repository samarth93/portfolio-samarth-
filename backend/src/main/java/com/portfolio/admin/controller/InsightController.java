package com.portfolio.admin.controller;

import com.portfolio.admin.model.Insight;
import com.portfolio.admin.service.AuthService;
import com.portfolio.admin.service.InsightService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/insights")
public class InsightController {
    
    @Autowired
    private InsightService insightService;
    
    @Autowired
    private AuthService authService;
    
    @GetMapping
    public ResponseEntity<List<Insight>> getPublishedInsights() {
        List<Insight> insights = insightService.getPublishedInsights();
        return ResponseEntity.ok(insights);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Insight> getInsightById(@PathVariable String id) {
        Optional<Insight> insight = insightService.getInsightById(id);
        return insight.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllInsights(@RequestHeader("Authorization") String token) {
        if (!isAuthenticated(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        
        List<Insight> insights = insightService.getAllInsights();
        return ResponseEntity.ok(insights);
    }
    
    @PostMapping
    public ResponseEntity<?> createInsight(@Valid @RequestBody Insight insight,
                                           @RequestHeader("Authorization") String token) {
        if (!isAuthenticated(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        
        Insight createdInsight = insightService.createInsight(insight);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdInsight);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateInsight(@PathVariable String id,
                                           @Valid @RequestBody Insight insight,
                                           @RequestHeader("Authorization") String token) {
        if (!isAuthenticated(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        
        Optional<Insight> updatedInsight = insightService.updateInsight(id, insight);
        return updatedInsight.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInsight(@PathVariable String id,
                                           @RequestHeader("Authorization") String token) {
        if (!isAuthenticated(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        
        boolean deleted = insightService.deleteInsight(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Insight deleted successfully"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/{id}/publish")
    public ResponseEntity<?> publishInsight(@PathVariable String id,
                                            @RequestHeader("Authorization") String token) {
        if (!isAuthenticated(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        
        Optional<Insight> publishedInsight = insightService.publishInsight(id);
        return publishedInsight.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    private boolean isAuthenticated(String token) {
        if (token == null) return false;
        
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        
        return authService.isValidToken(token);
    }
} 