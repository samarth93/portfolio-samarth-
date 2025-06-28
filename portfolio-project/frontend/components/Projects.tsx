'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/Projects.module.css';

interface Project {
  title: string;
  description: string;
  technologies: string;
  githubLink?: string;
}

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            
            // Animate projects when section becomes visible
            const projectCards = document.querySelectorAll(`.${styles.projectCard}`);
            projectCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add(styles.animatedIn);
              }, 200 * index);
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
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Projects</h2>
        
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={styles.projectCard}
            >
              <div className={styles.projectContent}>
                <div className={styles.iconContainer}>
                  {index === 0 && (
                    // CI/CD Pipeline icon
                    <svg viewBox="0 0 24 24" width="60" height="60" stroke="currentColor" strokeWidth="1" fill="none">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                      <path d="M7 8l3 3 3-3"></path>
                      <path d="M7 13l3-3 3 3"></path>
                    </svg>
                  )}
                  {index === 1 && (
                    // Three-Tier Architecture icon
                    <svg viewBox="0 0 24 24" width="60" height="60" stroke="currentColor" strokeWidth="1" fill="none">
                      <rect x="3" y="3" width="18" height="4" rx="1" ry="1"></rect>
                      <rect x="3" y="10" width="18" height="4" rx="1" ry="1"></rect>
                      <rect x="3" y="17" width="18" height="4" rx="1" ry="1"></rect>
                      <line x1="12" y1="7" x2="12" y2="10"></line>
                      <line x1="12" y1="14" x2="12" y2="17"></line>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  )}
                  {index === 2 && (
                    // InsurTech icon
                    <svg viewBox="0 0 24 24" width="60" height="60" stroke="currentColor" strokeWidth="1" fill="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                    </svg>
                  )}
                  {index === 3 && (
                    // VPC Flow Logs icon
                    <svg viewBox="0 0 24 24" width="60" height="60" stroke="currentColor" strokeWidth="1" fill="none">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                      <path d="M5 7l5 3 5-3 5 3"></path>
                    </svg>
                  )}
                  {index === 4 && (
                    // VideoConnect icon
                    <svg viewBox="0 0 24 24" width="60" height="60" stroke="currentColor" strokeWidth="1" fill="none">
                      <polygon points="23 7 16 12 23 17 23 7"></polygon>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>
                  )}
                  {index === 5 && (
                    // VideoSearchAI icon
                    <svg viewBox="0 0 24 24" width="60" height="60" stroke="currentColor" strokeWidth="1" fill="none">
                      <path d="M12 3c-1.2 0-2.4.6-3 1.7A3.6 3.6 0 0 0 4.6 9c-1 .6-1.7 1.8-1.7 3 0 2 1.4 3.4 3.4 3.4h13.4c1.9 0 3.3-1.5 3.3-3.4 0-1.2-.7-2.3-1.7-2.9.2-.6.2-1.3 0-2-.4-1.5-2-2.5-3.6-2.1-.5-1.2-1.7-2-3-2Z"></path>
                      <path d="M9 16.4V19l3 3 3-3v-2.6"></path>
                    </svg>
                  )}
                </div>
                
                <h3>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                
                <div className={styles.techStack}>
                  <h4>Technologies:</h4>
                  <div className={styles.techList}>
                    {project.technologies.split(',').map((tech, techIndex) => (
                      <span key={techIndex} className={styles.techTag}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.projectLinks}>
                  <a href="#" className={styles.projectLink}>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    View Project
                  </a>
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.projectLink}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      GitHub
                    </a>
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

export default Projects; 