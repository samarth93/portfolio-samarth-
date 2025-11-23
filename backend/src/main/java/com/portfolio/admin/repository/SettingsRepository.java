package com.portfolio.admin.repository;

import com.portfolio.admin.model.Settings;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingsRepository extends MongoRepository<Settings, String> {
    // MongoDB will automatically implement basic CRUD operations
    // Since there should only be one settings document, we'll handle this in the
    // service
}
