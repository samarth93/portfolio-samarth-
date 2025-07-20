'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

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

    const footer = footerRef.current;
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <span className={styles.logo}>Samarth</span>
            <p className={styles.tagline}>Cloud Developer & DevOps Engineer</p>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.linksColumn}>
              <h4>Navigation</h4>
              <ul>
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#core-domains">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
              </ul>
            </div>
            
            <div className={styles.linksColumn}>
              <h4>More</h4>
              <ul>
                <li><a href="#journey">Experience</a></li>
                <li><a href="#certifications">Certifications</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className={styles.scrollTop} onClick={scrollToTop}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>© {currentYear} Samarth. All rights reserved.</p>
          <p>Made with Next.js & Spring Boot</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 