'use client';

import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            
            // Animate certification items when section becomes visible
            const items = document.querySelectorAll(`.${styles.certificationItem}`);
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add(styles.animatedIn);
              }, 150 * index);
            });
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

  const getCertificationIcon = (title: string, index: number) => {
    if (title.toLowerCase().includes('aws') || title.toLowerCase().includes('amazon')) {
      return (
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.29 7 12 12 20.71 7"></polyline>
          <line x1="12" y1="22" x2="12" y2="12"></line>
        </svg>
      );
    } else if (title.toLowerCase().includes('kubernetes') || title.toLowerCase().includes('cka')) {
      return (
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      );
    } else if (title.toLowerCase().includes('terraform') || title.toLowerCase().includes('hashicorp')) {
      return (
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      );
    } else if (title.toLowerCase().includes('bosch')) {
      return (
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="M21 15.5c-1.5 0-3-1-3-3s1.5-3 3-3"></path>
        </svg>
      );
    } else if (title.toLowerCase().includes('workshop') || title.toLowerCase().includes('training')) {
      return (
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      );
    } else if (title.toLowerCase().includes('winner') || title.toLowerCase().includes('hackathon')) {
      return (
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
          <path d="M4 22h16"></path>
          <path d="M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34"></path>
          <path d="M2 14h20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2z"></path>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
      );
    }
  };

  return (
    <section id="certifications" className={styles.certifications} ref={sectionRef}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Certifications & Achievements</h2>
        
        <div className={styles.certificationGrid}>
          {certifications.map((certification, index) => (
            <div key={index} className={styles.certificationItem}>
              <div className={styles.certBadge}>
                {getCertificationIcon(certification.title, index)}
              </div>
              <div className={styles.certContent}>
                <div className={styles.certName}>{certification.title}</div>
                <div className={styles.issuer}>{certification.issuer}</div>
                <div className={styles.issuedDate}>{certification.issuedDate}</div>
                {certification.link && (
                  <div className={styles.certActions}>
                    <a href={certification.link} target="_blank" rel="noopener noreferrer" className={styles.viewCert}>
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      View Credential
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications; 