package com.portfolio.admin.controller;

import com.portfolio.admin.model.Project;
import com.portfolio.admin.service.AuthService;
import com.portfolio.admin.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;
    
    @Autowired
    private AuthService authService;
    
    // Public endpoint - no authentication required
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
    
    // Public endpoint - no authentication required
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable String id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Public endpoint - no authentication required
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Project>> getProjectsByCategory(@PathVariable String category) {
        List<Project> projects = projectService.getProjectsByCategory(category);
        return ResponseEntity.ok(projects);
    }
    
    // Admin endpoint - authentication required
    @PostMapping
    public ResponseEntity<?> createProject(@Valid @RequestBody Project project,
                                           @RequestHeader("Authorization") String token) {
        if (!isAuthenticated(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        
        Project createdProject = projectService.createProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
    }
    
    // Admin endpoint - authentication required
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable String id,
                                           @Valid @RequestBody Project project,
                                           @RequestHeader("Authorization") String token) {
        if (!isAuthenticated(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        
        Optional<Project> updatedProject = projectService.updateProject(id, project);
        return updatedProject.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Admin endpoint - authentication required
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable String id,
                                           @RequestHeader("Authorization") String token) {
        if (!isAuthenticated(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        
        boolean deleted = projectService.deleteProject(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Project deleted successfully"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Admin endpoint - authentication required
    @GetMapping("/count")
    public ResponseEntity<?> getProjectCount(@RequestHeader("Authorization") String token) {
        if (!isAuthenticated(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        
        long count = projectService.getProjectCount();
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