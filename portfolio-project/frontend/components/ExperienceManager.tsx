'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/ExperienceManager.module.css';
import { API_ENDPOINTS, createAuthHeaders } from '../lib/api';

interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  keyAchievements: string[];
  createdAt: string;
  updatedAt: string;
}

interface ExperienceFormData {
  role: string;
  company: string;
  duration: string;
  keyAchievements: string[];
}

interface ExperienceManagerProps {
  token: string;
}

const ExperienceManager: React.FC<ExperienceManagerProps> = ({ token }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<ExperienceFormData>({
    role: '',
    company: '',
    duration: '',
    keyAchievements: ['']
  });

  // Fetch experiences from backend
  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.EXPERIENCES);
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
        setError(null);
      } else {
        throw new Error('Failed to fetch experiences');
      }
    } catch (err) {
      console.error('Error fetching experiences:', err);
      setError('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.role || !formData.company || !formData.duration) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const payload = {
        ...formData,
        keyAchievements: formData.keyAchievements.filter(achievement => achievement.trim() !== '')
      };

      const url = editingExperience 
        ? `${API_ENDPOINTS.EXPERIENCES}/${editingExperience.id}`
        : API_ENDPOINTS.EXPERIENCES;
      
      const method = editingExperience ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: createAuthHeaders(token),
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        await fetchExperiences();
        resetForm();
        setError(null);
      } else {
        throw new Error('Failed to save experience');
      }
    } catch (err) {
      console.error('Error saving experience:', err);
      setError('Failed to save experience');
    }
  };

  // Delete experience
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const response = await fetch(`${API_ENDPOINTS.EXPERIENCES}/${id}`, {
        method: 'DELETE',
        headers: createAuthHeaders(token)
      });

      if (response.ok) {
        await fetchExperiences();
        setError(null);
      } else {
        throw new Error('Failed to delete experience');
      }
    } catch (err) {
      console.error('Error deleting experience:', err);
      setError('Failed to delete experience');
    }
  };

  // Start editing
  const startEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      role: experience.role,
      company: experience.company,
      duration: experience.duration,
      keyAchievements: [...experience.keyAchievements, '']
    });
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      role: '',
      company: '',
      duration: '',
      keyAchievements: ['']
    });
    setEditingExperience(null);
    setShowForm(false);
  };

  // Handle achievement changes
  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...formData.keyAchievements];
    newAchievements[index] = value;
    setFormData({ ...formData, keyAchievements: newAchievements });
  };

  // Add achievement field
  const addAchievementField = () => {
    setFormData({
      ...formData,
      keyAchievements: [...formData.keyAchievements, '']
    });
  };

  // Remove achievement field
  const removeAchievementField = (index: number) => {
    const newAchievements = formData.keyAchievements.filter((_, i) => i !== index);
    setFormData({ ...formData, keyAchievements: newAchievements });
  };

  if (loading) {
    return <div className={styles.loading}>Loading experiences...</div>;
  }

  return (
    <div className={styles.experienceManager}>
      <div className={styles.header}>
        <h2>Experience Management</h2>
        <button 
          className={styles.addButton}
          onClick={() => setShowForm(true)}
        >
          Add New Experience
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {showForm && (
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h3>{editingExperience ? 'Edit Experience' : 'Add New Experience'}</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="role">Role/Title *</label>
              <input
                type="text"
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g., Software Developer"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="company">Company Name *</label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g., Google Inc."
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="duration">Duration *</label>
              <input
                type="text"
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., Jan 2023 - Dec 2024"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Key Achievements</label>
              {formData.keyAchievements.map((achievement, index) => (
                <div key={index} className={styles.achievementField}>
                  <textarea
                    value={achievement}
                    onChange={(e) => handleAchievementChange(index, e.target.value)}
                    placeholder="Describe a key achievement or responsibility..."
                    rows={2}
                  />
                  {formData.keyAchievements.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeAchievementField(index)}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                onClick={addAchievementField}
                className={styles.addAchievementButton}
              >
                Add Achievement
              </button>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                {editingExperience ? 'Update' : 'Save'} Experience
              </button>
              <button type="button" onClick={resetForm} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.experienceList}>
        <h3>Existing Experiences ({experiences.length})</h3>
        {experiences.length === 0 ? (
          <p className={styles.noData}>No experiences found. Add your first experience!</p>
        ) : (
          experiences.map((experience) => (
            <div key={experience.id} className={styles.experienceCard}>
              <div className={styles.experienceHeader}>
                <h4>{experience.role}</h4>
                <div className={styles.experienceActions}>
                  <button 
                    onClick={() => startEdit(experience)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(experience.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className={styles.company}>{experience.company}</p>
              <p className={styles.duration}>{experience.duration}</p>
              <div className={styles.achievements}>
                <strong>Key Achievements:</strong>
                <ul>
                  {experience.keyAchievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.metadata}>
                <span>Created: {new Date(experience.createdAt).toLocaleDateString()}</span>
                <span>Updated: {new Date(experience.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExperienceManager; 