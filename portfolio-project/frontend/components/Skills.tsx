'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/Skills.module.css';

interface SkillsProps {
  skills: {
    cloud: string[];
    devops: string[];
    programming: string[];
    frameworks: string[];
  };
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
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
        rootMargin: '0px 0px -50px 0px' // Only trigger when section is well into view
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
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <div className="container">
        <div className={styles.sectionSeparator}></div>
        <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
        
        <div className={styles.content}>
          <div className={styles.skillSetContainer}>
            <div className={`${styles.skillSet} ${styles.cloudSkills}`}>
              <h3>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
                AWS Services
              </h3>
              <div className={styles.skillList}>
                {skills.cloud.map((skill, index) => (
                  <div key={index} className={styles.skillItem}>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`${styles.skillSet} ${styles.devopsSkills}`}>
              <h3>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
                  <line x1="2" y1="20" x2="2" y2="20"></line>
                </svg>
                DevOps & CI/CD
              </h3>
              <div className={styles.skillList}>
                {skills.devops.map((skill, index) => (
                  <div key={index} className={styles.skillItem}>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.skillSetContainer}>
            <div className={`${styles.skillSet} ${styles.programmingSkills}`}>
              <h3>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                Programming Languages
              </h3>
              <div className={styles.skillList}>
                {skills.programming.map((skill, index) => (
                  <div key={index} className={styles.skillItem}>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`${styles.skillSet} ${styles.frameworkSkills}`}>
              <h3>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                Frameworks & Tools
              </h3>
              <div className={styles.skillList}>
                {skills.frameworks.map((skill, index) => (
                  <div key={index} className={styles.skillItem}>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.devopsPipeline}>
          <h3>DevOps Pipeline Workflow</h3>
          <div className={styles.pipeline}>
            <div className={styles.pipelineStep}>
              <div className={`${styles.pipelineCircle}`}>
                <span>1</span>
              </div>
              <div className={styles.pipelineLabel}>Code</div>
            </div>
            <div className={styles.pipelineLine}></div>
            
            <div className={styles.pipelineStep}>
              <div className={styles.pipelineCircle}>
                <span>2</span>
              </div>
              <div className={styles.pipelineLabel}>Build</div>
            </div>
            <div className={styles.pipelineLine}></div>
            
            <div className={styles.pipelineStep}>
              <div className={styles.pipelineCircle}>
                <span>3</span>
              </div>
              <div className={styles.pipelineLabel}>Test</div>
            </div>
            <div className={styles.pipelineLine}></div>
            
            <div className={styles.pipelineStep}>
              <div className={styles.pipelineCircle}>
                <span>4</span>
              </div>
              <div className={styles.pipelineLabel}>Deploy</div>
            </div>
            <div className={styles.pipelineLine}></div>
            
            <div className={styles.pipelineStep}>
              <div className={styles.pipelineCircle}>
                <span>5</span>
              </div>
              <div className={styles.pipelineLabel}>Monitor</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 