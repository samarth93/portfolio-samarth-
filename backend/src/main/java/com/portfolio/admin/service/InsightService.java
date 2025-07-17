package com.portfolio.admin.service;

import com.portfolio.admin.model.Insight;
import com.portfolio.admin.repository.InsightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InsightService {
    
    @Autowired
    private InsightRepository insightRepository;
    
    public List<Insight> getAllInsights() {
        return insightRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }
    
    public List<Insight> getPublishedInsights() {
        return insightRepository.findAll().stream()
                .filter(Insight::isPublished)
                .sorted((i1, i2) -> i2.getCreatedAt().compareTo(i1.getCreatedAt()))
                .toList();
    }
    
    public Optional<Insight> getInsightById(String id) {
        return insightRepository.findById(id);
    }
    
    public Insight createInsight(Insight insight) {
        return insightRepository.save(insight);
    }
    
    public Optional<Insight> updateInsight(String id, Insight updatedInsight) {
        return insightRepository.findById(id)
                .map(existingInsight -> {
                    updatedInsight.setId(id);
                    updatedInsight.setCreatedAt(existingInsight.getCreatedAt());
                    updatedInsight.updateTimestamp();
                    return insightRepository.save(updatedInsight);
                });
    }
    
    public boolean deleteInsight(String id) {
        if (insightRepository.existsById(id)) {
            insightRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public long getInsightCount() {
        return insightRepository.count();
    }
    
    public List<Insight> getInsightsByCategory(String category) {
        return insightRepository.findAll().stream()
                .filter(insight -> category.equals(insight.getCategory()))
                .sorted((i1, i2) -> i2.getCreatedAt().compareTo(i1.getCreatedAt()))
                .toList();
    }
    
    public Optional<Insight> publishInsight(String id) {
        return insightRepository.findById(id)
                .map(insight -> {
                    insight.setPublished(true);
                    insight.updateTimestamp();
                    return insightRepository.save(insight);
                });
    }
} 