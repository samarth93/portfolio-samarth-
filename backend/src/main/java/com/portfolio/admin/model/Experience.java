package com.portfolio.admin.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "experience")
public class Experience {
    
    @Id
    private String id;
    
    @NotBlank(message = "Role is required")
    private String role;
    
    @NotBlank(message = "Company is required")
    private String company;
    
    @NotBlank(message = "Duration is required")
    private String duration;
    
    @NotNull(message = "Key achievements are required")
    private List<String> keyAchievements;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Experience() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Experience(String role, String company, String duration, List<String> keyAchievements) {
        this();
        this.role = role;
        this.company = company;
        this.duration = duration;
        this.keyAchievements = keyAchievements;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public String getCompany() {
        return company;
    }
    
    public void setCompany(String company) {
        this.company = company;
    }
    
    public String getDuration() {
        return duration;
    }
    
    public void setDuration(String duration) {
        this.duration = duration;
    }
    
    public List<String> getKeyAchievements() {
        return keyAchievements;
    }
    
    public void setKeyAchievements(List<String> keyAchievements) {
        this.keyAchievements = keyAchievements;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public void updateTimestamp() {
        this.updatedAt = LocalDateTime.now();
    }
} 