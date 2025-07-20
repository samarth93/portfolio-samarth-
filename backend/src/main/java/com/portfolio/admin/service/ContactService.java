package com.portfolio.admin.service;

import com.portfolio.admin.model.Contact;
import com.portfolio.admin.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    // Create a new contact submission
    public Contact createContact(Contact contact) {
        if (contact.getName() == null || contact.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (contact.getEmail() == null || contact.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (contact.getMessage() == null || contact.getMessage().trim().isEmpty()) {
            throw new IllegalArgumentException("Message is required");
        }
        
        // Set default values
        contact.setSubmittedAt(LocalDateTime.now());
        contact.setRead(false);
        contact.setStatus("NEW");
        
        return contactRepository.save(contact);
    }

    // Get all contacts (sorted by submission date, newest first)
    public List<Contact> getAllContacts() {
        return contactRepository.findAll(Sort.by(Sort.Direction.DESC, "submittedAt"));
    }

    // Get contact by ID
    public Optional<Contact> getContactById(String id) {
        return contactRepository.findById(id);
    }

    // Mark contact as read
    public Contact markAsRead(String id) {
        Optional<Contact> contactOpt = contactRepository.findById(id);
        if (contactOpt.isPresent()) {
            Contact contact = contactOpt.get();
            contact.setRead(true);
            if ("NEW".equals(contact.getStatus())) {
                contact.setStatus("READ");
            }
            return contactRepository.save(contact);
        }
        throw new RuntimeException("Contact not found with id: " + id);
    }

    // Update contact status
    public Contact updateStatus(String id, String status) {
        Optional<Contact> contactOpt = contactRepository.findById(id);
        if (contactOpt.isPresent()) {
            Contact contact = contactOpt.get();
            contact.setStatus(status);
            if ("READ".equals(status) || "REPLIED".equals(status)) {
                contact.setRead(true);
            }
            return contactRepository.save(contact);
        }
        throw new RuntimeException("Contact not found with id: " + id);
    }

    // Delete contact
    public void deleteContact(String id) {
        if (!contactRepository.existsById(id)) {
            throw new RuntimeException("Contact not found with id: " + id);
        }
        contactRepository.deleteById(id);
    }

    // Get unread contacts
    public List<Contact> getUnreadContacts() {
        return contactRepository.findByIsReadFalse();
    }

    // Get contacts by status
    public List<Contact> getContactsByStatus(String status) {
        return contactRepository.findByStatus(status);
    }

    // Get contacts count
    public long getTotalContactsCount() {
        return contactRepository.count();
    }

    // Get unread contacts count
    public long getUnreadContactsCount() {
        return contactRepository.countByIsReadFalse();
    }

    // Search contacts by name
    public List<Contact> searchContactsByName(String name) {
        return contactRepository.findByNameContainingIgnoreCase(name);
    }

    // Get recent contacts (last 30 days)
    public List<Contact> getRecentContacts() {
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        return contactRepository.findBySubmittedAtAfter(thirtyDaysAgo);
    }
} 