'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Throttled scroll handler to improve performance
  const throttledScrollHandler = useCallback(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Update scroll state
          setIsScrolled(window.scrollY > 50);

          // Only track sections on the main page
          if (pathname === '/') {
            const sections = ['hero', 'about', 'projects', 'certifications', 'contact'];
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
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    return handleScroll;
  }, [pathname]);

  useEffect(() => {
    const handleScroll = throttledScrollHandler();

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttledScrollHandler]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest(`.${styles.mobileMenu}`)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const navigateToPage = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (pathname === '/') {
      scrollToSection('hero');
    } else {
      router.push('/');
    }
  };

  const [resumeUrl, setResumeUrl] = useState('https://drive.google.com/file/d/18d8w1UB-icb3r5HUhQmrbDOOgqc7R0j6/view?usp=sharing');

  // Fetch resume URL from settings
  useEffect(() => {
    const fetchResumeUrl = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          if (data.resumeUrl) {
            setResumeUrl(data.resumeUrl);
          }
        }
      } catch (error) {
        console.error('Failed to fetch resume URL:', error);
        // Keep default URL if fetch fails
      }
    };

    fetchResumeUrl();
  }, []);

  const handleResumeClick = () => {
    window.open(resumeUrl, '_blank');
  };

  const handleAdminClick = () => {
    navigateToPage('/admin');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <div className={styles.logo} onClick={handleHomeClick}>
            Samarth
          </div>

          <div className={styles.navRight}>
            <ul className={styles.navItems}>
              <li
                onClick={() => pathname === '/' ? scrollToSection('about') : navigateToPage('/')}
                className={activeSection === 'about' && pathname === '/' ? styles.activeNavItem : ''}
              >
                About
              </li>
              <li
                onClick={() => pathname === '/' ? scrollToSection('projects') : navigateToPage('/')}
                className={activeSection === 'projects' && pathname === '/' ? styles.activeNavItem : ''}
              >
                Projects
              </li>
              <li
                onClick={() => navigateToPage('/community')}
                className={pathname === '/community' ? styles.activeNavItem : ''}
              >
                Community
              </li>
              <li
                onClick={() => navigateToPage('/insights')}
                className={pathname === '/insights' ? styles.activeNavItem : ''}
              >
                Insights
              </li>
              <li
                onClick={() => pathname === '/' ? scrollToSection('certifications') : navigateToPage('/')}
                className={activeSection === 'certifications' && pathname === '/' ? styles.activeNavItem : ''}
              >
                Certifications
              </li>
              <li
                onClick={() => pathname === '/' ? scrollToSection('contact') : navigateToPage('/')}
                className={activeSection === 'contact' && pathname === '/' ? styles.activeNavItem : ''}
              >
                Contact
              </li>
            </ul>

            <button className={styles.resumeButton} onClick={handleResumeClick}>
              <svg className={styles.resumeIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Resume
            </button>

            <button className={styles.adminButton} onClick={handleAdminClick} title="Admin Panel">
              <svg className={styles.adminIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6C13.89 6 13 6.89 13 8V22H15V16H17V22H19V8C19 6.89 18.1 6 17 6V4L21 7Z" />
                <path d="M5 6C3.9 6 3 6.9 3 8V22H5V16H7V22H9V8C9 6.9 8.1 6 7 6H5Z" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
        <ul className={styles.mobileNavItems}>
          <li
            onClick={() => pathname === '/' ? scrollToSection('about') : navigateToPage('/')}
            className={activeSection === 'about' && pathname === '/' ? styles.active : ''}
          >
            About
          </li>
          <li
            onClick={() => pathname === '/' ? scrollToSection('projects') : navigateToPage('/')}
            className={activeSection === 'projects' && pathname === '/' ? styles.active : ''}
          >
            Projects
          </li>
          <li
            onClick={() => navigateToPage('/community')}
            className={pathname === '/community' ? styles.active : ''}
          >
            Community
          </li>
          <li
            onClick={() => navigateToPage('/insights')}
            className={pathname === '/insights' ? styles.active : ''}
          >
            Insights
          </li>
          <li
            onClick={() => pathname === '/' ? scrollToSection('certifications') : navigateToPage('/')}
            className={activeSection === 'certifications' && pathname === '/' ? styles.active : ''}
          >
            Certifications
          </li>
          <li
            onClick={() => pathname === '/' ? scrollToSection('contact') : navigateToPage('/')}
            className={activeSection === 'contact' && pathname === '/' ? styles.active : ''}
          >
            Contact
          </li>
        </ul>

        <button className={styles.mobileResumeButton} onClick={handleResumeClick}>
          <svg className={styles.resumeIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Resume
        </button>

        <button className={styles.mobileAdminButton} onClick={handleAdminClick}>
          <svg className={styles.adminIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6C13.89 6 13 6.89 13 8V22H15V16H17V22H19V8C19 6.89 18.1 6 17 6V4L21 7Z" />
            <path d="M5 6C3.9 6 3 6.9 3 8V22H5V16H7V22H9V8C9 6.9 8.1 6 7 6H5Z" />
          </svg>
          Admin
        </button>
      </div>
    </>
  );
};

export default Navbar; 