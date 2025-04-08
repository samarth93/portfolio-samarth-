'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/Certifications.module.css';

interface CertificationsProps {
  certifications: string[];
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

  return (
    <section id="certifications" className={styles.certifications} ref={sectionRef}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Certifications</h2>
        
        <div className={styles.certificationGrid}>
          {certifications.map((certification, index) => (
            <div key={index} className={styles.certificationItem}>
              <div className={styles.certBadge}>
                {index === 0 && (
                  // AWS Certified Solutions Architect icon
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                    <line x1="12" y1="22" x2="12" y2="12"></line>
                  </svg>
                )}
                {index === 1 && (
                  // AWS DevOps icon
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="4"></circle>
                    <line x1="21.17" y1="8" x2="12" y2="8"></line>
                    <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                    <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
                  </svg>
                )}
                {index === 2 && (
                  // Kubernetes icon
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                )}
                {index === 3 && (
                  // Terraform icon
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                )}
              </div>
              <div className={styles.certContent}>
                <div className={styles.certName}>{certification}</div>
                <div className={styles.issuer}>
                  {index === 0 && 'Amazon Web Services'}
                  {index === 1 && 'Amazon Web Services'}
                  {index === 2 && 'Cloud Native Computing Foundation'}
                  {index === 3 && 'HashiCorp'}
                </div>
                <div className={styles.issuedDate}>
                  {index === 0 && 'Issued: October 2022 · Expires: October 2025'}
                  {index === 1 && 'Issued: July 2022 · Expires: July 2025'}
                  {index === 2 && 'Issued: March 2023 · Expires: March 2026'}
                  {index === 3 && 'Issued: January 2023 · Expires: January 2025'}
                </div>
                <div className={styles.certActions}>
                  <a href="#" className={styles.viewCert}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    View Credential
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications; 