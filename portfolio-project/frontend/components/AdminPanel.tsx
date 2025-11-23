'use client'

import React, { useState } from 'react';
import styles from '../styles/AdminPanel.module.css';
import ExperienceManager from './ExperienceManager';
import ProjectManager from './ProjectManager';
import InsightManager from './InsightManager';
import ContactManager from './ContactManager';
import SettingsManager from './SettingsManager';
import { API_ENDPOINTS, createAuthHeaders } from '../lib/api';

interface AdminPanelProps {
  token: string;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    experiences: 0,
    projects: 0,
    insights: 0,
    publishedInsights: 0,
    contacts: 0,
    unreadContacts: 0
  });

  const handleLogout = async () => {
    try {
      await fetch(API_ENDPOINTS.LOGOUT, {
        method: 'POST',
        headers: createAuthHeaders(token),
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    onLogout();
  };

  // Fetch statistics for dashboard
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const [experiencesRes, projectsRes, insightsRes] = await Promise.all([
          fetch(API_ENDPOINTS.EXPERIENCES),
          fetch(API_ENDPOINTS.PROJECTS),
          fetch(API_ENDPOINTS.INSIGHTS)
        ]);

        const [experiences, projects, insights] = await Promise.all([
          experiencesRes.json(),
          projectsRes.json(),
          insightsRes.json()
        ]);

        // Fetch contact stats separately to handle potential errors
        let contactStats = { totalContacts: 0, unreadContacts: 0 };
        try {
          const contactsRes = await fetch(API_ENDPOINTS.CONTACTS_STATS, {
            headers: createAuthHeaders(token)
          });
          if (contactsRes.ok) {
            contactStats = await contactsRes.json();
          }
        } catch (contactError) {
          console.error('Error fetching contact stats:', contactError);
        }

        setStats({
          experiences: experiences.length,
          projects: projects.length,
          insights: insights.length,
          publishedInsights: insights.filter((insight: { published: boolean }) => insight.published).length,
          contacts: contactStats.totalContacts || 0,
          unreadContacts: contactStats.unreadContacts || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [token]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'insights', label: 'Insights', icon: '✍️' },
    { id: 'contacts', label: 'Messages', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className={styles.dashboardContent}>
            <div className={styles.welcomeCard}>
              <h2>Welcome to Admin Dashboard</h2>
              <p>Manage your portfolio content from here. All data is synced with the backend.</p>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>{stats.experiences}</h3>
                <p>Experiences</p>
              </div>
              <div className={styles.statCard}>
                <h3>{stats.projects}</h3>
                <p>Projects</p>
              </div>
              <div className={styles.statCard}>
                <h3>{stats.insights}</h3>
                <p>Total Insights</p>
              </div>
              <div className={styles.statCard}>
                <h3>{stats.publishedInsights}</h3>
                <p>Published</p>
              </div>
              <div className={styles.statCard}>
                <h3>{stats.contacts}</h3>
                <p>Total Messages</p>
              </div>
              <div className={styles.statCard}>
                <h3>{stats.unreadContacts}</h3>
                <p>Unread Messages</p>
              </div>
            </div>
          </div>
        );
      case 'experience':
        return <ExperienceManager token={token} />;
      case 'projects':
        return <ProjectManager token={token} />;
      case 'insights':
        return <InsightManager token={token} />;
      case 'contacts':
        return <ContactManager token={token} />;
      case 'settings':
        return <SettingsManager token={token} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.adminPanel}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
        </div>
        <nav className={styles.nav}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.icon}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <span className={styles.icon}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className={styles.mainContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel; 