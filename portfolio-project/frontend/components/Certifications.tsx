'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Certifications.module.css';

interface Certification {
  title: string;
  issuer: string;
  issuedDate: string;
  link?: string;
}

interface CertificationsProps {
  certifications: Certification[];
}

const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  // Categorize certifications
  const categorizedCertifications = certifications.map(cert => ({
    ...cert,
    category: cert.title.toLowerCase().includes('aws') ? 'cloud' :
             cert.title.toLowerCase().includes('bosch') || 
             cert.title.toLowerCase().includes('industry') || 
             cert.title.toLowerCase().includes('msme') ? 'industry' :
             cert.title.toLowerCase().includes('winner') || cert.title.toLowerCase().includes('hackathon') ? 'achievements' :
             'training',
    priority: cert.title.toLowerCase().includes('aws') ? 1 :
             cert.title.toLowerCase().includes('winner') ? 2 :
             cert.title.toLowerCase().includes('bosch') || cert.title.toLowerCase().includes('industry') ? 3 : 4
  })).sort((a, b) => a.priority - b.priority);

  const certificationStats = {
    total: certifications.length,
    cloud: certifications.filter(c => c.title.toLowerCase().includes('aws')).length,
    industry: certifications.filter(c => c.title.toLowerCase().includes('bosch') || c.title.toLowerCase().includes('industry') || c.title.toLowerCase().includes('msme')).length,
    achievements: certifications.filter(c => c.title.toLowerCase().includes('winner') || c.title.toLowerCase().includes('hackathon')).length,
    training: certifications.filter(c => 
      !c.title.toLowerCase().includes('aws') && 
      !c.title.toLowerCase().includes('bosch') && 
      !c.title.toLowerCase().includes('industry') &&
      !c.title.toLowerCase().includes('msme') &&
      !c.title.toLowerCase().includes('winner') && 
      !c.title.toLowerCase().includes('hackathon')
    ).length
  };

  const filters = [
    { id: 'all', label: 'All Certifications', count: certificationStats.total },
    { id: 'cloud', label: 'Cloud & AWS', count: certificationStats.cloud },
    { id: 'achievements', label: 'Achievements', count: certificationStats.achievements },
    { id: 'industry', label: 'Industry', count: certificationStats.industry },
    { id: 'training', label: 'Training & Workshops', count: certificationStats.training }
  ];

  const filteredCertifications = activeFilter === 'all' 
    ? categorizedCertifications 
    : categorizedCertifications.filter(cert => cert.category === activeFilter);

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

  const getCertificationIcon = (title: string, category: string) => {
    if (category === 'cloud') {
      return (
        <div className={styles.iconCloud}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
          </svg>
        </div>
      );
    } else if (category === 'achievements') {
      return (
        <div className={styles.iconAchievement}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34"></path>
            <path d="M2 14h20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2z"></path>
          </svg>
        </div>
      );
    } else if (category === 'industry') {
      return (
        <div className={styles.iconIndustry}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="M21 15.5c-1.5 0-3-1-3-3s1.5-3 3-3"></path>
          </svg>
        </div>
      );
    } else {
      return (
        <div className={styles.iconTraining}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        </div>
      );
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cloud': return '#1d4ed8'; // Primary blue
      case 'achievements': return '#f59e0b'; // Orange for achievements
      case 'industry': return '#10b981'; // Green for industry
      case 'training': return '#8b5cf6'; // Purple for training
      default: return '#6b7280'; // Gray fallback
    }
  };

  return (
    <section id="certifications" className={styles.certifications} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Certifications & Achievements</h2>
          <p className={styles.sectionSubtitle}>
            Professional certifications, industry recognition, and continuous learning milestones
          </p>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsContainer}>
          <div className={styles.statsCard}>
            <div className={styles.statIcon}>📜</div>
            <div className={styles.statValue}>{certificationStats.total}</div>
            <div className={styles.statLabel}>Total Certifications</div>
          </div>
          <div className={styles.statsCard}>
            <div className={styles.statIcon}>☁️</div>
            <div className={styles.statValue}>{certificationStats.cloud}</div>
            <div className={styles.statLabel}>Cloud Certifications</div>
          </div>
          <div className={styles.statsCard}>
            <div className={styles.statIcon}>🏆</div>
            <div className={styles.statValue}>{certificationStats.achievements}</div>
            <div className={styles.statLabel}>Achievements</div>
          </div>
          <div className={styles.statsCard}>
            <div className={styles.statIcon}>🎓</div>
            <div className={styles.statValue}>{certificationStats.training}</div>
            <div className={styles.statLabel}>Training Programs</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterContainer}>
          <div className={styles.filterTabs}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`${styles.filterTab} ${activeFilter === filter.id ? styles.active : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <span className={styles.filterLabel}>{filter.label}</span>
                <span className={styles.filterCount}>{filter.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className={styles.content}>
          <div className={styles.certificationGrid}>
            {filteredCertifications.map((certification, index) => (
              <div
                key={index}
                className={styles.certificationCard}
                style={{
                  '--category-color': getCategoryColor(certification.category),
                  '--delay': `${index * 0.1}s`
                } as React.CSSProperties}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.certificationIcon}>
                    {getCertificationIcon(certification.title, certification.category)}
                  </div>
                  <div className={styles.categoryBadge}>
                    {certification.category.charAt(0).toUpperCase() + certification.category.slice(1)}
                  </div>
                </div>
                
                <div className={styles.cardContent}>
                  <h3 className={styles.certificationTitle}>{certification.title}</h3>
                  <div className={styles.issuerInfo}>
                    <div className={styles.issuerName}>{certification.issuer}</div>
                    <div className={styles.issuedDate}>{certification.issuedDate}</div>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  {certification.link && (
                    <a
                      href={certification.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.viewCredential}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      View Credential
                    </a>
                  )}
                  <div className={styles.verificationStatus}>
                    <div className={styles.verificationBadge}>
                      <div className={styles.verificationDot}></div>
                      Verified
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Continuous Learning Journey</h3>
            <p className={styles.ctaDescription}>
              I&apos;m committed to staying current with industry trends and continuously expanding my expertise through ongoing certification and training programs.
            </p>
            <div className={styles.ctaButtons}>
              <a
                href="https://www.credly.com/users/samarth-pal.8fb52d79/badges"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                View All Credentials
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications; 