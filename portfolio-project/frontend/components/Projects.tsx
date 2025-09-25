'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Projects.module.css';

interface BackendProject {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  demoLink?: string;
  category: string;
  keyFeatures?: string[];
  createdAt: string;
  updatedAt: string;
}

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [backendProjects, setBackendProjects] = useState<BackendProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transform backend projects to enhanced format
  const transformBackendProjects = (backendProjects: BackendProject[]) => {
    return backendProjects.map((project, index) => ({
      id: project.id.toString(),
      title: project.name || 'Untitled Project',
      category: project.category || 'Development',
      description: project.description || 'No description available',
      shortDescription: (project.description && project.description.length > 100)
        ? project.description.substring(0, 100) + '...' 
        : (project.description || 'No description available'),
      technologies: Array.isArray(project.techStack) 
        ? project.techStack.join(', ') 
        : (typeof project.techStack === 'string' ? project.techStack : ''),
      githubLink: project.githubLink,
      features: Array.isArray(project.keyFeatures) && project.keyFeatures.length > 0
        ? project.keyFeatures
        : ['No key features specified']
    }));
  };

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        console.log('Attempting to fetch projects from backend...');
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch('http://127.0.0.1:8080/api/projects', {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          setBackendProjects(data);
          setError(null);
          console.log('Successfully fetched projects:', data.length);
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            setError('Request timed out - backend might be starting up');
          } else {
            setError(`Failed to load projects: ${err.message}`);
          }
        } else {
          setError('Failed to load projects: Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Only use backend data - no hardcoded fallbacks
  const enhancedProjects = transformBackendProjects(backendProjects);

  // Projects list now only uses backend data

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (styles.visible) {
              entry.target.classList.add(styles.visible);
            }
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

  // Show empty state when no projects
  if (!loading && enhancedProjects.length === 0 && !error) {
    return (
      <section id="projects" className={styles.projects} ref={sectionRef}>
        <div className="container">
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
            <p className={styles.sectionSubtitle}>
              Showcasing innovative solutions and technical implementations
            </p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem', 
            color: '#6b7280' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#374151' }}>
              No Projects Yet
            </div>
            <div style={{ fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              No projects have been added yet. Check back soon for showcases of innovative solutions and technical implementations!
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
                Admin? Log in to add projects →
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state when backend fails
  if (error && !loading) {
    return (
      <section id="projects" className={styles.projects} ref={sectionRef}>
        <div className="container">
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
            <p className={styles.sectionSubtitle}>
              Showcasing innovative solutions and technical implementations
            </p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem', 
            color: '#6b7280' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#374151' }}>
              Unable to Load Projects
            </div>
            <div style={{ fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              {error}. Please check that the backend server is running.
            </div>
          </div>
        </div>
      </section>
    );
  }

  const activeProjectData = enhancedProjects[activeProject];

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <p className={styles.sectionSubtitle}>
            Showcasing innovative solutions and technical implementations
            {backendProjects.length > 0 && !error && (
              <span style={{ color: '#10b981', fontSize: '0.9rem', marginLeft: '10px' }}>
                ● {backendProjects.length} projects from backend
              </span>
            )}
            {error && (
              <span style={{ color: '#ef4444', fontSize: '0.9rem', marginLeft: '10px' }}>
                ● Error: {error}
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
              🚀 Loading projects...
            </div>
            <div style={{ fontSize: '0.9rem' }}>
              Fetching projects from backend
            </div>
          </div>
        )}

        {!loading && enhancedProjects.length > 0 && activeProjectData && (
        <div className={styles.content}>
          {/* Project Navigation */}
          <div className={styles.projectNav}>
            {enhancedProjects.map((project, index) => (
              <button
                key={project.id}
                className={`${styles.navItem} ${activeProject === index ? styles.active : ''}`}
                onClick={() => setActiveProject(index)}
                style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
              >
                <div className={styles.navIcon}>{index + 1}</div>
                <div className={styles.navContent}>
                  <h4 className={styles.navTitle}>{project.title}</h4>
                  <p className={styles.navCategory}>{project.category}</p>
                  <p className={styles.navDescription}>{project.shortDescription}</p>
                </div>
              </button>
                    ))}
                  </div>

          {/* Active Project Details */}
          <div className={styles.projectDetails}>
            <div className={styles.projectHeader}>
              <div className={styles.projectMeta}>
                <span className={styles.projectCategory}>{activeProjectData.category}</span>
                <h3 className={styles.projectTitle}>{activeProjectData.title}</h3>
                <p className={styles.projectDescription}>{activeProjectData.description}</p>
                </div>
                
              {activeProjectData.githubLink && (
                    <a 
                  href={activeProjectData.githubLink}
                      target="_blank" 
                      rel="noopener noreferrer" 
                  className={styles.githubLink}
                    >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                  View Source
                    </a>
                  )}
            </div>

            <div className={styles.projectInfo}>
              {/* Key Features */}
              <div className={styles.featuresSection}>
                <h4>Key Features</h4>
                <div className={styles.featuresList}>
                  {activeProjectData.features.map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                      <div className={styles.featureIcon}>✓</div>
                      <span className={styles.featureText}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>



              {/* Technologies */}
              <div className={styles.technologiesSection}>
                <h4>Technologies Used</h4>
                <div className={styles.techTags}>
                  {activeProjectData.technologies && activeProjectData.technologies.split(',').map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default Projects; 