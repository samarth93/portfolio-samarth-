'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Throttled scroll handler to improve performance
  const throttledScrollHandler = useCallback(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Update scroll state
          setIsScrolled(window.scrollY > 50);
          
          // Simplified section detection - only check when scrolling stops
          const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
          let currentSection = 'hero';
          
          for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
              const rect = section.getBoundingClientRect();
              if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
                break;
              }
            }
          }
          
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    return handleScroll;
  }, []);

  useEffect(() => {
    const handleScroll = throttledScrollHandler();
    
    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttledScrollHandler]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => scrollToSection('hero')}>
          Samarth
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