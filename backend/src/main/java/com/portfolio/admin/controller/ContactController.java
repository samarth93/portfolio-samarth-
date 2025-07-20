package com.portfolio.admin.controller;

import com.portfolio.admin.model.Contact;
import com.portfolio.admin.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactService contactService;

    // Public endpoint for contact form submission (no authentication required)
    @PostMapping
    public ResponseEntity<?> createContact(@RequestBody Contact contact) {
        try {
            Contact savedContact = contactService.createContact(contact);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Thank you for your message! I'll get back to you soon.");
            response.put("contactId", savedContact.getId());
            
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "An error occurred while processing your request. Please try again.");
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Admin endpoints (require authentication)
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts(@RequestHeader("Authorization") String token) {
        try {
            if (!isValidToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            List<Contact> contacts = contactService.getAllContacts();
            return ResponseEntity.ok(contacts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable String id, @RequestHeader("Authorization") String token) {
        try {
            if (!isValidToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            Optional<Contact> contact = contactService.getContactById(id);
            if (contact.isPresent()) {
                return ResponseEntity.ok(contact.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Contact> markAsRead(@PathVariable String id, @RequestHeader("Authorization") String token) {
        try {
            if (!isValidToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            Contact updatedContact = contactService.markAsRead(id);
            return ResponseEntity.ok(updatedContact);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Contact> updateStatus(@PathVariable String id, @RequestBody Map<String, String> request, @RequestHeader("Authorization") String token) {
        try {
            if (!isValidToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            String status = request.get("status");
            if (status == null || status.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            
            Contact updatedContact = contactService.updateStatus(id, status);
            return ResponseEntity.ok(updatedContact);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable String id, @RequestHeader("Authorization") String token) {
        try {
            if (!isValidToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            contactService.deleteContact(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/unread")
    public ResponseEntity<List<Contact>> getUnreadContacts(@RequestHeader("Authorization") String token) {
        try {
            if (!isValidToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            List<Contact> unreadContacts = contactService.getUnreadContacts();
            return ResponseEntity.ok(unreadContacts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getContactStats(@RequestHeader("Authorization") String token) {
        try {
            if (!isValidToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalContacts", contactService.getTotalContactsCount());
            stats.put("unreadContacts", contactService.getUnreadContactsCount());
            stats.put("newContacts", contactService.getContactsByStatus("NEW").size());
            stats.put("recentContacts", contactService.getRecentContacts().size());
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Contact>> searchContacts(@RequestParam String name, @RequestHeader("Authorization") String token) {
        try {
            if (!isValidToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            List<Contact> contacts = contactService.searchContactsByName(name);
            return ResponseEntity.ok(contacts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Simple token validation (using the same logic as other controllers)
    private boolean isValidToken(String token) {
        return "Bearer admin-token-2024".equals(token);
    }
} 