'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/Hero.module.css';

interface HeroProps {
  name: string;
  title: string;
}

const Hero: React.FC<HeroProps> = ({ name, title }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Enhanced Particle class for floating elements
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      maxOpacity: number;
      color: string;
      shape: 'circle' | 'square' | 'triangle' | 'hexagon';
      rotation: number;
      rotationSpeed: number;
      pulseSpeed: number;
      pulsePhase: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 6 + 2;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.maxOpacity = Math.random() * 0.6 + 0.3;
        this.opacity = this.maxOpacity;
        this.color = this.getRandomColor();
        this.shape = this.getRandomShape();
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      getRandomColor(): string {
        const colors = [
          'rgba(56, 189, 248, ',
          'rgba(147, 197, 253, ',
          'rgba(99, 102, 241, ',
          'rgba(168, 85, 247, ',
          'rgba(34, 197, 94, ',
          'rgba(251, 191, 36, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      getRandomShape(): 'circle' | 'square' | 'triangle' | 'hexagon' {
        const shapes: ('circle' | 'square' | 'triangle' | 'hexagon')[] = ['circle', 'square', 'triangle', 'hexagon'];
        return shapes[Math.floor(Math.random() * shapes.length)];
      }

      draw() {
        if (!ctx) return;
        
        // Update opacity with pulse effect
        this.pulsePhase += this.pulseSpeed;
        this.opacity = this.maxOpacity * (0.7 + 0.3 * Math.sin(this.pulsePhase));
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.strokeStyle = this.color + this.opacity + ')';
        ctx.lineWidth = 1.5;

        // Add glow effect
        ctx.shadowColor = this.color + '0.8)';
        ctx.shadowBlur = this.size * 2;

        switch (this.shape) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'square':
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
            break;
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(-this.size, this.size);
            ctx.lineTo(this.size, this.size);
            ctx.closePath();
            ctx.fill();
            break;
          case 'hexagon':
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3;
              const x = this.size * Math.cos(angle);
              const y = this.size * Math.sin(angle);
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
            break;
        }
        ctx.restore();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Smooth wrap around screen with fade effect
        if (this.x > canvas!.width + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = canvas!.width + this.size;
        if (this.y > canvas!.height + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = canvas!.height + this.size;

        this.draw();
      }
    }

    // Enhanced Connection lines between particles
    class Connection {
      static draw(particles: Particle[]) {
        if (!ctx) return;
        
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              const opacity = 0.15 * (1 - distance / 120);
              ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
    }

    // Create particles
    const particles: Particle[] = [];
    
    // Create more particles for richer effect
    for (let i = 0; i < 60; i++) {
      particles.push(new Particle());
    }

    // Animation
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      
      // Draw connection lines first (behind particles)
      Connection.draw(particles);
      
      // Draw particles
      particles.forEach(particle => particle.update());
      
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.cloudCanvas}></canvas>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.profileBadge}>
          <span className={styles.statusDot}></span>
          Available for opportunities
        </div>
        <h1 className="animate-fade-in">
          Hello, I&apos;m <span className={styles.highlight}>{name}</span>
        </h1>
        <h2 className="animate-slide-up">{title}</h2>
        <p className="animate-slide-up">
          Passionate about building scalable cloud infrastructure and streamlining DevOps processes. 
          Experienced in AWS services, containerization, and automation with a focus on delivering 
          high-performance solutions.
        </p>
        <div className={styles.buttons}>
          <button 
            className={`btn ${styles.primaryBtn} animate-slide-up`} 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            View Projects
          </button>
          <button 
            className={`${styles.secondaryBtn} animate-slide-up`} 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Contact Me
          </button>
        </div>
      </div>
      <div className={styles.scrollDown}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <div>
          <span className={styles.scrollDownArrow}></span>
          <span className={styles.scrollDownArrow}></span>
          <span className={styles.scrollDownArrow}></span>
        </div>
      </div>
    </section>
  );
};

export default Hero; 