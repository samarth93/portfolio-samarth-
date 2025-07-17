'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Community.module.css';

const Community = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const communityActivities = [
    {
      id: 'workshops',
      title: 'Technical Workshops',
      icon: '🎓',
      description: 'Conducted 15+ hands-on workshops on AWS services, reaching 300+ students and professionals',
      color: '#3b82f6',
      activities: [
        {
          title: 'AWS Cloud Foundations Workshop',
          description: 'Comprehensive 3-day workshop covering AWS fundamentals, EC2, S3, and basic cloud architecture',
          participants: '50+ students',
          duration: '3 days',
          impact: 'Increased cloud adoption by 60% among participants'
        },
        {
          title: 'Serverless Computing Masterclass',
          description: 'Deep dive into AWS Lambda, API Gateway, and serverless architecture patterns',
          participants: '40+ developers',
          duration: '2 days',
          impact: 'Helped 5+ companies implement serverless solutions'
        },
        {
          title: 'DevOps Pipeline Workshop',
          description: 'Hands-on session building CI/CD pipelines with AWS CodePipeline and GitHub Actions',
          participants: '60+ engineers',
          duration: '1 day',
          impact: 'Participants reduced deployment time by 50% on average'
        },
        {
          title: 'Container Orchestration with Kubernetes',
          description: 'Practical workshop on Kubernetes deployment, scaling, and management',
          participants: '35+ DevOps engineers',
          duration: '2 days',
          impact: 'Enabled container adoption in 8+ organizations'
        }
      ]
    },
    {
      id: 'leadership',
      title: 'Community Leadership',
      icon: '👑',
      description: 'Leading technical communities, organizing events, and mentoring the next generation of developers',
      color: '#10b981',
      activities: [
        {
          title: 'AWS Cloud Captain Program',
          description: 'Selected as AWS Cloud Captain to evangelize cloud technologies and lead community initiatives',
          participants: '300+ community members',
          duration: '2019-2021',
          impact: 'Built largest AWS community group in the region'
        },
        {
          title: 'CIIE Team Lead',
          description: 'Led the Centre for Innovation, Incubation, and Entrepreneurship team, driving technology adoption',
          participants: '50+ team members',
          duration: '2017-2019',
          impact: 'Organized 10+ major technical events and hackathons'
        },
        {
          title: '36-Hour Hackathon Organizer',
          description: 'Successfully organized and managed large-scale hackathons with multiple tracks',
          participants: '200+ participants',
          duration: 'Multiple events',
          impact: 'Launched 15+ student startups and projects'
        },
        {
          title: 'Technical Mentorship Program',
          description: 'Mentored junior developers and students in cloud technologies and career development',
          participants: '100+ mentees',
          duration: 'Ongoing',
          impact: 'Helped 80+ students land their first tech jobs'
        }
      ]
    },
    {
      id: 'contributions',
      title: 'Open Source & Content',
      icon: '💡',
      description: 'Contributing to open source projects, writing technical content, and sharing knowledge',
      color: '#f59e0b',
      activities: [
        {
          title: 'AWS Architecture Patterns Repository',
          description: 'Created comprehensive repository of AWS architecture patterns and best practices',
          participants: '500+ GitHub stars',
          duration: 'Ongoing',
          impact: 'Used by 50+ companies for reference architectures'
        },
        {
          title: 'Technical Blog Series',
          description: 'Regular blog posts on cloud architecture, DevOps practices, and backend development',
          participants: '10K+ monthly readers',
          duration: 'Ongoing',
          impact: 'Helped developers solve complex technical challenges'
        },
        {
          title: 'Conference Speaker',
          description: 'Delivered technical talks at various conferences and meetups',
          participants: '1000+ attendees',
          duration: 'Multiple events',
          impact: 'Shared knowledge with broader tech community'
        },
        {
          title: 'Code Review & Mentoring',
          description: 'Volunteer code reviewer and mentor for junior developers',
          participants: '200+ developers',
          duration: 'Ongoing',
          impact: 'Improved code quality and best practices adoption'
        }
      ]
    }
  ];

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

  const activeActivity = communityActivities[activeTab];

  return (
    <section id="community" className={styles.community} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Community Impact</h2>
          <p className={styles.sectionSubtitle}>
            Empowering developers, sharing knowledge, and building stronger tech communities through workshops, mentorship, and leadership
          </p>
        </div>

        <div className={styles.content}>
          {/* Community Stats */}
          <div className={styles.statsSection}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🎓</div>
              <div className={styles.statValue}>300+</div>
              <div className={styles.statLabel}>Students Trained</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🏆</div>
              <div className={styles.statValue}>15+</div>
              <div className={styles.statLabel}>Workshops Conducted</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🚀</div>
              <div className={styles.statValue}>10+</div>
              <div className={styles.statLabel}>Events Organized</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>💼</div>
              <div className={styles.statValue}>80+</div>
              <div className={styles.statLabel}>Career Placements</div>
            </div>
          </div>

          {/* Activity Tabs */}
          <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
              {communityActivities.map((activity, index) => (
                <button
                  key={activity.id}
                  className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
                  onClick={() => setActiveTab(index)}
                  style={{
                    '--tab-color': activity.color,
                    '--delay': `${index * 0.1}s`
                  } as React.CSSProperties}
                >
                  <span className={styles.tabIcon}>{activity.icon}</span>
                  <span className={styles.tabTitle}>{activity.title}</span>
                </button>
              ))}
            </div>

            {/* Active Activity Content */}
            <div className={styles.activityContent}>
              <div className={styles.activityHeader}>
                <div className={styles.activityIcon} style={{ background: activeActivity.color }}>
                  {activeActivity.icon}
                </div>
                <div className={styles.activityInfo}>
                  <h3 className={styles.activityTitle}>{activeActivity.title}</h3>
                  <p className={styles.activityDescription}>{activeActivity.description}</p>
                </div>
              </div>

              <div className={styles.activitiesList}>
                {activeActivity.activities.map((item, index) => (
                  <div
                    key={index}
                    className={styles.activityItem}
                    style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
                  >
                    <div className={styles.activityItemHeader}>
                      <h4 className={styles.activityItemTitle}>{item.title}</h4>
                      <div className={styles.activityItemMeta}>
                        <span className={styles.metaItem}>
                          <span className={styles.metaIcon}>👥</span>
                          {item.participants}
                        </span>
                        <span className={styles.metaItem}>
                          <span className={styles.metaIcon}>⏱️</span>
                          {item.duration}
                        </span>
                      </div>
                    </div>
                    <p className={styles.activityItemDescription}>{item.description}</p>
                    <div className={styles.activityItemImpact}>
                      <span className={styles.impactIcon}>📈</span>
                      <span className={styles.impactText}>{item.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>Let's Build Something Together</h3>
            <p className={styles.ctaDescription}>
              Interested in collaborating, organizing a workshop, or discussing community initiatives? 
              I'm always excited to connect with fellow developers and contribute to the tech community.
            </p>
            <div className={styles.ctaButtons}>
              <button
                className={styles.ctaButton}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </button>
              <a
                href="https://www.linkedin.com/in/samarth-pal-9701ba235/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community; 