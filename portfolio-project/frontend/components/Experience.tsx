'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/Experience.module.css';

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string;
}

interface ExperienceProps {
  experiences: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            
            // Animate experience items when section becomes visible
            const items = document.querySelectorAll(`.${styles.experienceItem}`);
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add(styles.animatedIn);
              }, 300 * index);
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
    <section id="experience" className={styles.experience} ref={sectionRef}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Professional Experience</h2>
        
        <div className={styles.timeline}>
          {experiences.map((item, index) => (
            <div key={index} className={styles.experienceItem}>
              <div className={styles.timelinePoint}>
                {index === 0 && (
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v8"></path>
                    <path d="M8 12h8"></path>
                  </svg>
                )}
                {index === 1 && (
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                  </svg>
                )}
                {index === 2 && (
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                )}
              </div>
              
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <h3 className={styles.position}>{item.position}</h3>
                  <div className={styles.company}>{item.company}</div>
                  <div className={styles.period}>{item.period}</div>
                </div>
                
                <div className={styles.timelineBody}>
                  <p>{item.description}</p>
                  
                  {index === 0 && (
                    <div className={styles.keyAchievements}>
                      <h4>Key Achievements:</h4>
                      <ul>
                        <li>Implemented CI/CD pipelines reducing deployment time by 70%</li>
                        <li>Migrated legacy applications to containerized microservices</li>
                        <li>Reduced infrastructure costs by 35% through optimization</li>
                      </ul>
                    </div>
                  )}
                  
                  {index === 1 && (
                    <div className={styles.keyAchievements}>
                      <h4>Key Achievements:</h4>
                      <ul>
                        <li>Designed cloud architecture for enterprise clients in finance and healthcare</li>
                        <li>Led team of 5 cloud specialists in implementing AWS best practices</li>
                        <li>Developed disaster recovery strategies with 99.99% uptime SLA</li>
                      </ul>
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className={styles.keyAchievements}>
                      <h4>Key Achievements:</h4>
                      <ul>
                        <li>Built scalable backend systems for data-intensive applications</li>
                        <li>Mentored junior developers on software design patterns</li>
                        <li>Collaborated with product teams to deliver features on tight deadlines</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 