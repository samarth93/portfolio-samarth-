'use client';

import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS, createAuthHeaders } from '../lib/api';
import styles from '../styles/ContactManager.module.css';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  isRead: boolean;
  status: string;
}

interface ContactStats {
  totalContacts: number;
  unreadContacts: number;
  newContacts: number;
  recentContacts: number;
}

interface ContactManagerProps {
  token: string;
}

const ContactManager: React.FC<ContactManagerProps> = ({ token: authToken }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<ContactStats>({
    totalContacts: 0,
    unreadContacts: 0,
    newContacts: 0,
    recentContacts: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'NEW' | 'READ' | 'REPLIED'>('ALL');

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, []);

  const fetchContacts = async () => {
    try {
      if (!authToken) {
        setError('No authentication token found');
        return;
      }

      const response = await fetch(API_ENDPOINTS.CONTACTS, {
        headers: createAuthHeaders(authToken),
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
        setError('');
      } else {
        setError('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      if (!authToken) return;

      const response = await fetch(API_ENDPOINTS.CONTACTS_STATS, {
        headers: createAuthHeaders(authToken),
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const markAsRead = async (contactId: string) => {
    try {
      if (!authToken) return;

      const response = await fetch(`${API_ENDPOINTS.CONTACTS}/${contactId}/read`, {
        method: 'PUT',
        headers: createAuthHeaders(authToken),
      });

      if (response.ok) {
        const updatedContact = await response.json();
        setContacts(contacts.map(contact => 
          contact.id === contactId ? updatedContact : contact
        ));
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const updateStatus = async (contactId: string, status: string) => {
    try {
      if (!authToken) return;

      const response = await fetch(`${API_ENDPOINTS.CONTACTS}/${contactId}/status`, {
        method: 'PUT',
        headers: createAuthHeaders(authToken),
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const updatedContact = await response.json();
        setContacts(contacts.map(contact => 
          contact.id === contactId ? updatedContact : contact
        ));
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteContact = async (contactId: string) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      if (!authToken) return;

      const response = await fetch(`${API_ENDPOINTS.CONTACTS}/${contactId}`, {
        method: 'DELETE',
        headers: createAuthHeaders(authToken),
      });

      if (response.ok) {
        setContacts(contacts.filter(contact => contact.id !== contactId));
        setSelectedContact(null);
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'ALL') return true;
    return contact.status === filter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return '#3b82f6';
      case 'READ': return '#10b981';
      case 'REPLIED': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Contact Messages</h2>
        <button 
          onClick={fetchContacts}
          className={styles.refreshButton}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="m3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          Refresh
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.totalContacts}</div>
          <div className={styles.statLabel}>Total Messages</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.unreadContacts}</div>
          <div className={styles.statLabel}>Unread</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.newContacts}</div>
          <div className={styles.statLabel}>New</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.recentContacts}</div>
          <div className={styles.statLabel}>Recent (30 days)</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        {['ALL', 'NEW', 'READ', 'REPLIED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`${styles.filterTab} ${filter === status ? styles.active : ''}`}
          >
            {status === 'ALL' ? 'All Messages' : status}
            {status !== 'ALL' && (
              <span className={styles.filterCount}>
                {contacts.filter(c => c.status === status).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {/* Contacts List */}
        <div className={styles.contactsList}>
          {filteredContacts.length === 0 ? (
            <div className={styles.emptyState}>
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <h3>No messages found</h3>
              <p>No contact messages match the current filter.</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`${styles.contactCard} ${!contact.isRead ? styles.unread : ''} ${
                  selectedContact?.id === contact.id ? styles.selected : ''
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className={styles.contactHeader}>
                  <div className={styles.contactInfo}>
                    <div className={styles.contactName}>{contact.name}</div>
                    <div className={styles.contactEmail}>{contact.email}</div>
                  </div>
                  <div className={styles.contactMeta}>
                    <div 
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(contact.status) }}
                    >
                      {contact.status}
                    </div>
                    <div className={styles.contactDate}>
                      {formatDate(contact.submittedAt)}
                    </div>
                  </div>
                </div>
                <div className={styles.contactSubject}>
                  {contact.subject || 'No subject'}
                </div>
                <div className={styles.contactPreview}>
                  {contact.message.substring(0, 100)}
                  {contact.message.length > 100 && '...'}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contact Detail */}
        {selectedContact && (
          <div className={styles.contactDetail}>
            <div className={styles.detailHeader}>
              <h3>Message Details</h3>
              <div className={styles.detailActions}>
                {!selectedContact.isRead && (
                  <button
                    onClick={() => markAsRead(selectedContact.id)}
                    className={styles.actionButton}
                  >
                    Mark as Read
                  </button>
                )}
                <select
                  value={selectedContact.status}
                  onChange={(e) => updateStatus(selectedContact.id, e.target.value)}
                  className={styles.statusSelect}
                >
                  <option value="NEW">New</option>
                  <option value="READ">Read</option>
                  <option value="REPLIED">Replied</option>
                </select>
                <button
                  onClick={() => deleteContact(selectedContact.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className={styles.detailContent}>
              <div className={styles.detailField}>
                <label>From:</label>
                <div>{selectedContact.name} ({selectedContact.email})</div>
              </div>

              <div className={styles.detailField}>
                <label>Subject:</label>
                <div>{selectedContact.subject || 'No subject'}</div>
              </div>

              <div className={styles.detailField}>
                <label>Submitted:</label>
                <div>{formatDate(selectedContact.submittedAt)}</div>
              </div>

              <div className={styles.detailField}>
                <label>Status:</label>
                <div 
                  className={styles.statusBadge}
                  style={{ backgroundColor: getStatusColor(selectedContact.status) }}
                >
                  {selectedContact.status}
                </div>
              </div>

              <div className={styles.detailField}>
                <label>Message:</label>
                <div className={styles.messageContent}>
                  {selectedContact.message}
                </div>
              </div>

              <div className={styles.detailActions}>
                <a 
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Your message'}`}
                  className={styles.replyButton}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactManager; 