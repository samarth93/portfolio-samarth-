package com.portfolio.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/")
public class RootController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> root() {
        return ResponseEntity.ok(Map.of(
            "message", "Portfolio Backend API",
            "version", "1.0.0",
            "status", "running",
            "endpoints", Map.of(
                "health", "/health",
                "api_docs", "/api-docs (if available)"
            )
        ));
    }
}