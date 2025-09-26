'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Journey.module.css';

interface BackendExperience {
  id: number;
  role: string;
  company: string;
  duration: string;
  keyAchievements: string[];
  createdAt: string;
  updatedAt: string;
}

const Journey = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [backendExperiences, setBackendExperiences] = useState<BackendExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transform backend experience to component format
  const transformBackendExperiences = (experiences: BackendExperience[]) => {
    const icons = ["💻", "☁️", "🚀", "🏢", "📊"];
    const colors = ["#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EF4444"];
    
    return experiences.map((exp, index) => ({
      title: exp.role,
      company: exp.company,
      period: exp.duration,
      description: `Professional role at ${exp.company} with key focus areas and responsibilities.`,
      achievements: exp.keyAchievements || [],
      icon: icons[index % icons.length],
      color: colors[index % colors.length]
    }));
  };

  // Fetch experiences from backend
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        console.log('Attempting to fetch experiences from backend...');
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch('/api/experiences', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          setBackendExperiences(data);
          setError(null);
          console.log('Successfully fetched experiences:', data.length);
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (err) {
        console.error('Error fetching experiences:', err);
        if (err instanceof Error && err.name === 'AbortError') {
          setError('Request timed out - backend might be starting up');
        } else if (err instanceof Error) {
          setError(`Failed to load experiences: ${err.message}`);
        } else {
          setError('Failed to load experiences: Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // Only use backend data - no hardcoded fallbacks
  const professionalExperience = transformBackendExperiences(backendExperiences);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
    <section id="journey" className={styles.journey} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Professional Experience</h2>
          <p className={styles.sectionSubtitle}>
            Building scalable solutions and driving innovation across diverse technical domains
            {backendExperiences.length > 0 && !error && (
              <span style={{ color: '#10b981', fontSize: '0.9rem', marginLeft: '10px' }}>
                ● {backendExperiences.length} experiences from backend
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
              💼 Loading experiences...
            </div>
            <div style={{ fontSize: '0.9rem' }}>
              Fetching professional journey from backend
            </div>
          </div>
        )}

        {!loading && backendExperiences.length === 0 && !error && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem', 
            color: '#6b7280' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#374151' }}>
              No Experience Records
            </div>
            <div style={{ fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              Professional experience information has not been added yet. Check back soon for details about career journey and achievements!
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
                Admin? Log in to add experience →
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
              Unable to Load Experience
            </div>
            <div style={{ fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              {error}. Please check that the backend server is running.
            </div>
          </div>
        )}

        {!loading && professionalExperience.length > 0 && (
        <div className={styles.content}>
          {/* Professional Experience */}
          <div className={styles.experienceContainer}>
            <div className={styles.experienceGrid}>
              {professionalExperience.map((exp, index) => (
                <div
                  key={index}
                  className={styles.experienceCard}
                  style={{
                    '--accent-color': exp.color,
                    '--delay': `${index * 0.15}s`
                  } as React.CSSProperties}
                >
                  <div className={styles.experienceHeader}>
                    <div className={styles.experienceIcon}>
                      <span>{exp.icon}</span>
                    </div>
                    <div className={styles.experienceInfo}>
                      <h4 className={styles.experienceTitle}>{exp.title}</h4>
                      <h5 className={styles.experienceCompany}>{exp.company}</h5>
                      <span className={styles.experiencePeriod}>{exp.period}</span>
                    </div>
                  </div>
                  <div className={styles.experienceDescription}>
                    <p>{exp.description}</p>
                  </div>
                  <div className={styles.experienceAchievements}>
                    <h6>Key Achievements:</h6>
                    <ul>
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default Journey; 