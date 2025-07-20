package com.portfolio.admin.repository;

import com.portfolio.admin.model.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactRepository extends MongoRepository<Contact, String> {
    
    // Find contacts by status
    List<Contact> findByStatus(String status);
    
    // Find unread contacts
    List<Contact> findByIsReadFalse();
    
    // Find contacts by email
    List<Contact> findByEmail(String email);
    
    // Find contacts submitted after a certain date
    List<Contact> findBySubmittedAtAfter(LocalDateTime date);
    
    // Find contacts by name containing (case insensitive)
    @Query("{'name': {$regex: ?0, $options: 'i'}}")
    List<Contact> findByNameContainingIgnoreCase(String name);
    
    // Count unread contacts
    long countByIsReadFalse();
    
    // Count contacts by status
    long countByStatus(String status);
} 