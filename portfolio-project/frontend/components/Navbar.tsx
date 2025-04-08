'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Detect which section is in view
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
      
      // Find the section that is currently most visible
      let currentSection = 'hero';
      let maxVisibility = 0;
      
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionHeight = rect.height;
          const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          const visibilityRatio = visibleHeight / sectionHeight;
          
          if (visibilityRatio > maxVisibility && visibilityRatio > 0.2) {
            maxVisibility = visibilityRatio;
            currentSection = sectionId;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => scrollToSection('hero')}>
          <span>S</span>amarth
        </div>
        
        <ul className={styles.navItems}>
          <li
            onClick={() => scrollToSection('about')}
            className={activeSection === 'about' ? styles.activeNavItem : ''}
          >
            About
          </li>
          <li
            onClick={() => scrollToSection('skills')}
            className={activeSection === 'skills' ? styles.activeNavItem : ''}
          >
            Skills
          </li>
          <li
            onClick={() => scrollToSection('projects')}
            className={activeSection === 'projects' ? styles.activeNavItem : ''}
          >
            Projects
          </li>
          <li
            onClick={() => scrollToSection('experience')}
            className={activeSection === 'experience' ? styles.activeNavItem : ''}
          >
            Experience
          </li>
          <li
            onClick={() => scrollToSection('certifications')}
            className={activeSection === 'certifications' ? styles.activeNavItem : ''}
          >
            Certifications
          </li>
          <li
            onClick={() => scrollToSection('contact')}
            className={activeSection === 'contact' ? styles.activeNavItem : ''}
          >
            Contact
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 