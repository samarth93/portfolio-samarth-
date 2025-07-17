'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Insights.module.css';
import { API_ENDPOINTS } from '../lib/api';

interface BackendInsight {
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

const Insights = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [backendInsights, setBackendInsights] = useState<BackendInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle opening article modal
  const openArticle = (article: any) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  // Handle closing article modal
  const closeArticle = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'unset'; // Restore background scroll
  };

  // Handle modal backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeArticle();
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeArticle();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Transform backend insights to component format
  const transformBackendInsights = (insights: BackendInsight[]) => {
    return insights.map((insight) => ({
      id: insight.id,
      title: insight.title,
      excerpt: insight.subtitle || (insight.content.length > 200 ? insight.content.substring(0, 200) + '...' : insight.content),
      category: insight.category,
      readTime: Math.max(2, Math.ceil(insight.content.length / 200)) + ' min read',
      publishedDate: insight.publishedAt || insight.createdAt,
      tags: insight.tags ? insight.tags.split(',').map(tag => tag.trim()) : [],
      featured: insight.published,
      content: insight.content,
      metrics: {
        views: Math.floor(Math.random() * 20000) + 'K',
        likes: Math.floor(Math.random() * 500),
        shares: Math.floor(Math.random() * 200)
      }
    }));
  };

  // Fetch insights from backend
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.INSIGHTS);
        if (response.ok) {
          const data = await response.json();
          setBackendInsights(data);
          setError(null);
        } else {
          throw new Error('Failed to fetch insights');
      }
      } catch (err) {
        console.error('Error fetching insights:', err);
        setError('Failed to load insights from backend');
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  // Only use backend data - no hardcoded fallbacks
  const insights = transformBackendInsights(backendInsights);

  const categories = ['all', 'DevOps', 'Backend', 'Cloud'];

  const filteredInsights = insights.filter(insight => 
    activeFilter === 'all' || insight.category === activeFilter
  );

  const featuredInsights = insights.filter(insight => insight.featured);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="insights" className={styles.insights} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Technical Insights</h2>
          <p className={styles.sectionSubtitle}>
            Sharing knowledge through technical articles, deep dives, and insights from building scalable systems
            {backendInsights.length > 0 && !error && (
              <span style={{ color: '#10b981', fontSize: '0.9rem', marginLeft: '10px' }}>
                ● {backendInsights.length} articles from backend
              </span>
            )}
            {error && (
              <span style={{ color: '#ef4444', fontSize: '0.9rem', marginLeft: '10px' }}>
                ● Error loading articles: {error}
              </span>
            )}
          </p>
        </div>

        {loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem', 
            color: '#6b7280' 
          }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              📖 Loading insights...
            </div>
            <div style={{ fontSize: '0.9rem' }}>
              Fetching articles from backend
            </div>
          </div>
        )}

        {!loading && backendInsights.length === 0 && !error && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem', 
            color: '#6b7280' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#374151' }}>
              No Articles Yet
            </div>
            <div style={{ fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              No technical articles have been published yet. Check back soon for insights on DevOps, Cloud, and Backend development!
            </div>
            <div style={{ marginTop: '2rem' }}>
              <a 
                href="/admin" 
                style={{ 
                  color: '#3b82f6', 
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                Admin? Log in to publish articles →
              </a>
            </div>
          </div>
        )}

        {error && !loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem', 
            color: '#6b7280' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#374151' }}>
              Unable to Load Articles
            </div>
            <div style={{ fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              {error}. Please check that the backend server is running.
            </div>
          </div>
        )}

        {!loading && insights.length > 0 && (
        <div className={styles.content}>
          {/* Featured Articles */}
          <div className={styles.featuredSection}>
            <h3 className={styles.featuredTitle}>Featured Articles</h3>
            <div className={styles.featuredGrid}>
              {featuredInsights.map((insight, index) => (
                <article
                  key={insight.id}
                  className={styles.featuredCard}
                  style={{ '--delay': `${index * 0.2}s` } as React.CSSProperties}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardMeta}>
                      <span className={styles.category}>{insight.category}</span>
                      <span className={styles.readTime}>{insight.readTime}</span>
                    </div>
                    <div className={styles.cardMetrics}>
                      <span className={styles.metric}>
                        <span className={styles.metricIcon}>👀</span>
                        {insight.metrics.views}
                      </span>
                      <span className={styles.metric}>
                        <span className={styles.metricIcon}>❤️</span>
                        {insight.metrics.likes}
                      </span>
                    </div>
                  </div>
                  <h4 className={styles.cardTitle}>{insight.title}</h4>
                  <p className={styles.cardExcerpt}>{insight.excerpt}</p>
                  <div className={styles.cardTags}>
                    {insight.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.publishDate}>
                      {new Date(insight.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <button 
                      className={styles.readMore}
                      onClick={() => openArticle(insight)}
                    >
                      Read More
                      <span className={styles.arrow}>→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>All Articles</h3>
            <div className={styles.filterTabs}>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`${styles.filterTab} ${activeFilter === category ? styles.active : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category === 'all' ? 'All' : category}
                  <span className={styles.count}>
                    {category === 'all' ? insights.length : insights.filter(i => i.category === category).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className={styles.articlesGrid}>
            {filteredInsights.map((insight, index) => (
              <article
                key={insight.id}
                className={styles.articleCard}
                style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardMeta}>
                    <span className={styles.category}>{insight.category}</span>
                    <span className={styles.readTime}>{insight.readTime}</span>
                  </div>
                  {insight.featured && (
                    <div className={styles.featuredBadge}>
                      <span className={styles.badgeIcon}>⭐</span>
                      Featured
                    </div>
                  )}
                </div>
                <h4 className={styles.cardTitle}>{insight.title}</h4>
                <p className={styles.cardExcerpt}>{insight.excerpt}</p>
                <div className={styles.cardTags}>
                  {insight.tags.slice(0, 4).map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.cardMetrics}>
                    <span className={styles.metric}>
                      <span className={styles.metricIcon}>👀</span>
                      {insight.metrics.views}
                    </span>
                    <span className={styles.metric}>
                      <span className={styles.metricIcon}>❤️</span>
                      {insight.metrics.likes}
                    </span>
                  </div>
                  <div className={styles.cardActions}>
                    <span className={styles.publishDate}>
                      {new Date(insight.publishedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <button 
                      className={styles.readMore}
                      onClick={() => openArticle(insight)}
                    >
                      Read More
                      <span className={styles.arrow}>→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className={styles.newsletterCTA}>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>Stay Updated</h3>
              <p className={styles.ctaDescription}>
                Get notified when I publish new technical articles and insights about DevOps, Cloud, and Backend development.
              </p>
              <div className={styles.ctaActions}>
                <a
                  href="https://www.linkedin.com/in/samarth-pal-9701ba235/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaButton}
                >
                  Follow on LinkedIn
                </a>
                <a
                  href="https://github.com/samarth93"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaSecondary}
                >
                  Follow on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Article Modal */}
      {isModalOpen && selectedArticle && (
        <div className={styles.modalOverlay} onClick={handleBackdropClick}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalMeta}>
                <span className={styles.modalCategory}>{selectedArticle.category}</span>
                <span className={styles.modalReadTime}>{selectedArticle.readTime}</span>
              </div>
              <button className={styles.closeButton} onClick={closeArticle}>
                <span className={styles.closeIcon}>✕</span>
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <h1 className={styles.modalTitle}>{selectedArticle.title}</h1>
              
              <div className={styles.modalAuthorInfo}>
                <div className={styles.authorDetails}>
                  <span className={styles.authorName}>Samarth Pal</span>
                  <span className={styles.publishDate}>
                    {new Date(selectedArticle.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className={styles.modalMetrics}>
                  <span className={styles.metric}>
                    <span className={styles.metricIcon}>👀</span>
                    {selectedArticle.metrics.views}
                  </span>
                  <span className={styles.metric}>
                    <span className={styles.metricIcon}>❤️</span>
                    {selectedArticle.metrics.likes}
                  </span>
                </div>
              </div>

              <div className={styles.modalTags}>
                {selectedArticle.tags.map((tag: string, index: number) => (
                  <span key={index} className={styles.modalTag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.modalContentSection}>
                <div className={styles.articleContent}>
                  {selectedArticle.content.split('\n').map((paragraph: string, index: number) => {
                    if (paragraph.trim() === '') return null;
                    
                    // Clean up any HTML tags that might be displayed as text
                    const cleanParagraph = paragraph.trim()
                      .replace(/<p>/g, '')
                      .replace(/<\/p>/g, '')
                      .replace(/<br\s*\/?>/g, '')
                      .replace(/<div>/g, '')
                      .replace(/<\/div>/g, '');
                    
                    if (cleanParagraph === '') return null;
                    
                    // Handle bullet points
                    if (cleanParagraph.startsWith('•')) {
                      return (
                        <li key={index} className={styles.bulletPoint}>
                          {cleanParagraph.substring(1).trim()}
                        </li>
                      );
                    }
                    
                    // Handle regular paragraphs
                    return (
                      <p key={index} className={styles.paragraph}>
                        {cleanParagraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              <div className={styles.modalFooter}>
                <div className={styles.shareSection}>
                  <span className={styles.shareText}>Share this article:</span>
                  <div className={styles.shareButtons}>
                    <button 
                      className={styles.shareButton}
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Article link copied to clipboard!');
                      }}
                    >
                      🔗 Copy Link
                    </button>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareButton}
                    >
                      💼 LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Insights; 