package com.portfolio.admin.repository;

import com.portfolio.admin.model.Insight;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsightRepository extends MongoRepository<Insight, String> {
} 