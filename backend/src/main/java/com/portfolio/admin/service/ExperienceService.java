package com.portfolio.admin.service;

import com.portfolio.admin.model.Experience;
import com.portfolio.admin.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ExperienceService {
    
    @Autowired
    private ExperienceRepository experienceRepository;
    
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }
    
    public Optional<Experience> getExperienceById(String id) {
        return experienceRepository.findById(id);
    }
    
    public Experience createExperience(Experience experience) {
        return experienceRepository.save(experience);
    }
    
    public Optional<Experience> updateExperience(String id, Experience updatedExperience) {
        return experienceRepository.findById(id)
                .map(existingExperience -> {
            updatedExperience.setId(id);
            updatedExperience.setCreatedAt(existingExperience.getCreatedAt());
            updatedExperience.updateTimestamp();
                    return experienceRepository.save(updatedExperience);
                });
    }
    
    public boolean deleteExperience(String id) {
        if (experienceRepository.existsById(id)) {
            experienceRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public long getExperienceCount() {
        return experienceRepository.count();
    }
} 