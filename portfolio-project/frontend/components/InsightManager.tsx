'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/InsightManager.module.css';

interface Insight {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  category: string;
  tags: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

interface InsightFormData {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  tags: string;
  published: boolean;
}

interface InsightManagerProps {
  token: string;
}

const InsightManager: React.FC<InsightManagerProps> = ({ token }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingInsight, setEditingInsight] = useState<Insight | null>(null);
  const [formData, setFormData] = useState<InsightFormData>({
    title: '',
    subtitle: '',
    content: '',
    category: '',
    tags: '',
    published: false
  });

  const categories = [
    'DevOps',
    'Backend',
    'Cloud',
    'AI & Machine Learning',
    'Data Science',
    'Security',
    'Mobile Development',
    'Web Development',
    'Other'
  ];

  // Fetch insights from backend
  const fetchInsights = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/insights/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setInsights(data);
        setError(null);
      } else {
        throw new Error('Failed to fetch insights');
      }
    } catch (err) {
      console.error('Error fetching insights:', err);
      setError('Failed to load insights');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [token]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const payload = {
        ...formData,
        subtitle: formData.subtitle || undefined,
        tags: formData.tags || undefined,
        category: formData.category || 'Other'
      };

      const url = editingInsight 
        ? `/api/insights/${editingInsight.id}`
        : '/api/insights';
      
      const method = editingInsight ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        await fetchInsights();
        resetForm();
        setError(null);
      } else {
        throw new Error('Failed to save insight');
      }
    } catch (err) {
      console.error('Error saving insight:', err);
      setError('Failed to save insight');
    }
  };

  // Delete insight
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this insight?')) return;

    try {
      const response = await fetch(`/api/insights/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchInsights();
        setError(null);
      } else {
        throw new Error('Failed to delete insight');
      }
    } catch (err) {
      console.error('Error deleting insight:', err);
      setError('Failed to delete insight');
    }
  };

  // Toggle publish status
  const togglePublish = async (id: number) => {
    try {
      const response = await fetch(`/api/insights/${id}/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchInsights();
        setError(null);
      } else {
        throw new Error('Failed to toggle publish status');
      }
    } catch (err) {
      console.error('Error toggling publish status:', err);
      setError('Failed to toggle publish status');
    }
  };

  // Start editing
  const startEdit = (insight: Insight) => {
    setEditingInsight(insight);
    setFormData({
      title: insight.title,
      subtitle: insight.subtitle || '',
      content: insight.content,
      category: insight.category,
      tags: insight.tags || '',
      published: insight.published
    });
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      content: '',
      category: '',
      tags: '',
      published: false
    });
    setEditingInsight(null);
    setShowForm(false);
  };

  // Helper function to strip HTML tags for preview
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  if (loading) {
    return <div className={styles.loading}>Loading insights...</div>;
  }

  const publishedCount = insights.filter(insight => insight.published).length;
  const draftCount = insights.filter(insight => !insight.published).length;

  return (
    <div className={styles.insightManager}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2>Insights Management</h2>
          <div className={styles.stats}>
            <span className={styles.stat}>
              <span className={styles.statNumber}>{publishedCount}</span>
              <span className={styles.statLabel}>Published</span>
            </span>
            <span className={styles.stat}>
              <span className={styles.statNumber}>{draftCount}</span>
              <span className={styles.statLabel}>Drafts</span>
            </span>
          </div>
        </div>
        <button 
          className={styles.addButton}
          onClick={() => setShowForm(true)}
        >
          Write New Article
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
            <h3>{editingInsight ? 'Edit Article' : 'Write New Article'}</h3>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter article title..."
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select a category...</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subtitle">Subtitle</label>
              <input
                type="text"
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Brief description or subtitle..."
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Comma-separated tags: react, javascript, tutorial"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="content">Content *</label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your article content here... You can use basic HTML tags like <h1>, <h2>, <p>, <ul>, <code>, etc."
                rows={15}
                required
              />
              <div className={styles.htmlHelp}>
                <strong>Supported HTML tags:</strong> &lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;code&gt;, &lt;pre&gt;, &lt;br&gt;, &lt;a&gt;
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                />
                <span className={styles.checkboxText}>Publish immediately</span>
              </label>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                {editingInsight ? 'Update' : 'Save'} Article
              </button>
              <button type="button" onClick={resetForm} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.insightList}>
        <h3>All Articles ({insights.length})</h3>
        {insights.length === 0 ? (
          <p className={styles.noData}>No articles found. Write your first article!</p>
        ) : (
          <div className={styles.insightGrid}>
            {insights.map((insight) => (
              <div key={insight.id} className={styles.insightCard}>
                <div className={styles.insightHeader}>
                  <div className={styles.insightTitle}>
                    <h4>{insight.title}</h4>
                    <div className={styles.insightMeta}>
                      <span className={styles.category}>{insight.category}</span>
                      <span className={`${styles.status} ${insight.published ? styles.published : styles.draft}`}>
                        {insight.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className={styles.insightActions}>
                    <button 
                      onClick={() => startEdit(insight)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => togglePublish(insight.id)}
                      className={`${styles.publishButton} ${insight.published ? styles.unpublish : styles.publish}`}
                    >
                      {insight.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button 
                      onClick={() => handleDelete(insight.id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {insight.subtitle && (
                  <p className={styles.subtitle}>{insight.subtitle}</p>
                )}
                
                <div className={styles.contentPreview}>
                  {stripHtml(insight.content).substring(0, 200)}...
                </div>
                
                {insight.tags && (
                  <div className={styles.tags}>
                    {insight.tags.split(',').map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className={styles.metadata}>
                  <div className={styles.metadataItem}>
                    <span className={styles.label}>Created:</span>
                    <span>{new Date(insight.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.metadataItem}>
                    <span className={styles.label}>Updated:</span>
                    <span>{new Date(insight.updatedAt).toLocaleDateString()}</span>
                  </div>
                  {insight.publishedAt && (
                    <div className={styles.metadataItem}>
                      <span className={styles.label}>Published:</span>
                      <span>{new Date(insight.publishedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightManager; 