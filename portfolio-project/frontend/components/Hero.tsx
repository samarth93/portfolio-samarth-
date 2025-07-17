'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Hero.module.css';

interface HeroProps {
  name: string;
  title: string;
}

const Hero: React.FC<HeroProps> = ({ name, title }) => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const commands = [
    { 
      command: 'kubectl get pods --all-namespaces',
      description: 'Managing Kubernetes clusters in production'
    },
    { 
      command: 'terraform apply -auto-approve',
      description: 'Infrastructure as Code deployment'
    },
    { 
      command: 'aws s3 sync ./build s3://portfolio-bucket',
      description: 'Automating CI/CD pipelines'
    },
    { 
      command: 'docker build -t app:latest .',
      description: 'Containerizing applications'
    },
    { 
      command: 'mvn clean package -DskipTests',
      description: 'Building Java backend services'
    }
  ];



  // Terminal typing animation
  useEffect(() => {
    if (!isTyping) return;

    const currentCmd = commands[currentCommand];
    const targetText = currentCmd.command;
    
    if (currentText.length < targetText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(targetText.slice(0, currentText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentText('');
        setCurrentCommand((prev) => (prev + 1) % commands.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentCommand, isTyping]);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.leftColumn}>
          <div className={styles.introduction}>
            <h1 className={styles.name}>
              <span className={styles.greeting}>Hello, I'm</span>
              <span className={styles.nameHighlight}>{name}</span>
            </h1>
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>
                <span className={styles.titleAccent}>DevOps Engineer</span>
                <span className={styles.titleSeparator}>•</span>
                <span className={styles.titleAccent}>Cloud Specialist</span>
                <span className={styles.titleSeparator}>•</span>
                <span className={styles.titleAccent}>Java Backend Developer</span>
              </h2>
        </div>
            <p className={styles.description}>
              Building scalable cloud infrastructure, automating deployments, and architecting 
              resilient backend systems. I transform complex technical challenges into elegant, 
              automated solutions that drive business growth.
            </p>

          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.terminalContainer}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalButtons}>
                <span className={styles.terminalButton} style={{backgroundColor: '#FF5F56'}}></span>
                <span className={styles.terminalButton} style={{backgroundColor: '#FFBD2E'}}></span>
                <span className={styles.terminalButton} style={{backgroundColor: '#27CA3F'}}></span>
              </div>
              <span className={styles.terminalTitle}>samarth@devops-workstation</span>
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.terminalLine}>
                <span className={styles.prompt}>$</span>
                <span className={styles.command}>{currentText}</span>
                <span className={styles.cursor}>|</span>
              </div>
              <div className={styles.terminalOutput}>
                <span className={styles.outputText}>
                  {commands[currentCommand].description}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.techStack}>
            <h3>Core Technologies</h3>
            <div className={styles.techGrid}>
              <div className={styles.techCategory}>
                <h4>Cloud & Infrastructure</h4>
                <div className={styles.techItems}>
                  <span>AWS</span>
                  <span>Terraform</span>
                  <span>Kubernetes</span>
                  <span>Docker</span>
                </div>
              </div>
              <div className={styles.techCategory}>
                <h4>Backend Development</h4>
                <div className={styles.techItems}>
                  <span>Java</span>
                  <span>Spring Boot</span>
                  <span>Microservices</span>
                  <span>REST APIs</span>
                </div>
              </div>
              <div className={styles.techCategory}>
                <h4>DevOps & Automation</h4>
                <div className={styles.techItems}>
                  <span>CI/CD</span>
                  <span>Jenkins</span>
                  <span>GitLab</span>
                  <span>Monitoring</span>
                </div>
        </div>
      </div>
        </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>Scroll to explore</div>
        <div className={styles.scrollArrow}>↓</div>
      </div>
    </section>
  );
};

export default Hero; 