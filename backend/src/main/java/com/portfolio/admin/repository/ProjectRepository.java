package com.portfolio.admin.repository;

import com.portfolio.admin.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
 
@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
} 