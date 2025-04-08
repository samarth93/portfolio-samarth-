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

    // Cloud class
    class Cloud {
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;
      color: string;
      canvasWidth: number;

      constructor(x: number, y: number, width: number, height: number, speed: number, canvasWidth: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = 'rgba(255, 255, 255, 0.8)';
        this.canvasWidth = canvasWidth;
      }

      draw() {
        if (!ctx) return;
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width/2, 0, Math.PI * 2);
        ctx.arc(this.x + this.width/3, this.y - this.height/3, this.width/3, 0, Math.PI * 2);
        ctx.arc(this.x + this.width/1.5, this.y, this.width/2.5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (this.x > this.canvasWidth + this.width) {
          this.x = -this.width;
        }
        this.x += this.speed;
        this.draw();
      }
    }

    // Create clouds
    const clouds: Cloud[] = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 100 + 50;
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height / 2);
      const speed = Math.random() * 0.5 + 0.1;
      clouds.push(new Cloud(x, y, size, size/2, speed, canvas.width));
    }

    // Animation
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw clouds
      clouds.forEach(cloud => cloud.update());
      
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Update cloud canvas widths
      clouds.forEach(cloud => {
        cloud.canvasWidth = canvas.width;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.cloudCanvas}></canvas>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className="animate-fade-in">
          Hello, I&apos;m <span className={styles.highlight}>{name}</span>
        </h1>
        <h2 className="animate-slide-up">{title}</h2>
        <p className="animate-slide-up">
          Building scalable cloud infrastructure and streamlining DevOps processes
        </p>
        <div className={styles.buttons}>
          <button 
            className={`btn ${styles.primaryBtn} animate-slide-up`} 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
          </button>
          <button 
            className={`${styles.secondaryBtn} animate-slide-up`} 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
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