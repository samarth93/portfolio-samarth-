package com.portfolio.admin.service;

import com.portfolio.admin.model.Project;
import com.portfolio.admin.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    public List<Project> getAllProjects() {
        return projectRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }
    
    public Optional<Project> getProjectById(String id) {
        return projectRepository.findById(id);
    }
    
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }
    
    public Optional<Project> updateProject(String id, Project updatedProject) {
        return projectRepository.findById(id)
                .map(existingProject -> {
            updatedProject.setId(id);
            updatedProject.setCreatedAt(existingProject.getCreatedAt());
            updatedProject.updateTimestamp();
                    return projectRepository.save(updatedProject);
                });
    }
    
    public boolean deleteProject(String id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public long getProjectCount() {
        return projectRepository.count();
    }
    
    public List<Project> getProjectsByCategory(String category) {
        return projectRepository.findAll().stream()
                .filter(project -> category.equals(project.getCategory()))
                .sorted((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()))
                .toList();
    }
} 