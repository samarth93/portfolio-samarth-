'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/About.module.css';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      {
        threshold: 0.1,
      }
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
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className="container">
        <h2 className={styles.sectionTitle}>About Me</h2>
        
        <div className={styles.content}>
          <div className={`${styles.profileImage} ${styles.animated}`}>
            <div className={styles.imageContainer}>
              <div className={styles.imagePlaceholder}>
                <svg viewBox="0 0 24 24" width="100" height="100" stroke="currentColor" strokeWidth="1" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
            <div className={styles.cloudIconContainer}>
              <div className={`${styles.cloudIcon} ${styles.cloud1}`}>
                <svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" strokeWidth="1" fill="none">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
              </div>
              <div className={`${styles.cloudIcon} ${styles.cloud2}`}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1" fill="none">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
              </div>
            </div>
            <div className={styles.codeIconContainer}>
              <div className={`${styles.codeIcon} ${styles.code1}`}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1" fill="none">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <div className={`${styles.codeIcon} ${styles.code2}`}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1" fill="none">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
            </div>
          </div>
          
          <div className={`${styles.infoContainer} ${styles.animated}`}>
            <div className={styles.summary}>
              <h3>Professional Summary</h3>
              <p>
                A dedicated Cloud Developer and DevOps Engineer with extensive experience in designing, 
                implementing, and managing cloud infrastructure on AWS, Azure, and GCP. Skilled in 
                containerization, orchestration, and CI/CD automation with a passion for building 
                secure, scalable, and resilient systems.
              </p>
              <p>
                I specialize in infrastructure as code (IaC) using Terraform and CloudFormation, 
                and have successfully led digital transformation initiatives that resulted in 
                significant improvements in deployment frequency, mean time to recovery, and overall 
                system reliability.
              </p>
            </div>
            
            <div className={styles.education}>
              <h3>Education</h3>
              <div className={styles.educationItem}>
                <h4>B.Tech in Computer Science and Engineering</h4>
                <p className={styles.institution}>SRM University, Sonipat, Haryana</p>
                <p className={styles.period}>October 2021 - Present</p>
                <p>Current SGPA - 8.1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 