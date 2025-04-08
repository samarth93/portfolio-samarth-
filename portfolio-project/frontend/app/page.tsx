'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';

interface ProfileData {
  name: string;
  title: string;
  email: string;
  github: string;
  linkedin: string;
  skills: {
    cloud: string[];
    devops: string[];
    programming: string[];
    frameworks: string[];
  };
  projects: {
    title: string;
    description: string;
    technologies: string;
  }[];
  experience: {
    company: string;
    position: string;
    period: string;
    description: string;
  }[];
  certifications: string[];
}

export default function HomePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Directly use mock data for now instead of API
    setProfileData({
      name: 'Samarth',
      title: 'Cloud Developer & DevOps Engineer',
      email: 'samarth@example.com',
      github: 'https://github.com/samarth',
      linkedin: 'https://linkedin.com/in/samarth',
      skills: {
        cloud: [
          'EC2', 'S3', 'Auto Scaling', 'CloudFormation', 'CDK', 
          'Lambda', 'EKS', 'VPC', 'CloudWatch', 'QuickSight', 'ECS'
        ],
        devops: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI/CD', 'GitHub Actions'],
        programming: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
        frameworks: ['Spring Boot', 'React', 'Next.js', 'Express']
      },
      projects: [
        {
          title: 'VPC Modelling with Flow Logs',
          description: 'Developed a solution for monitoring and analyzing VPC flow logs to enhance security and network optimization.',
          technologies: 'AWS, CloudWatch, Lambda, Terraform'
        },
        {
          title: 'VideoConnect',
          description: 'Built a video conferencing application with real-time chat and screen sharing capabilities.',
          technologies: 'WebRTC, React, Node.js, Socket.io'
        },
        {
          title: 'VideoSearchAI',
          description: 'Created an AI-powered video search platform that enables content discovery through semantic search.',
          technologies: 'Python, TensorFlow, AWS, React'
        }
      ],
      experience: [
        {
          company: 'SourceBow Technologies',
          position: 'Software Developer Intern',
          period: '2021 - Present',
          description: 'Designed and implemented caching mechanisms to enhance application responsiveness. Developed scalable e-commerce websites using Spring Boot and optimised database performance by 20%. Collaborated with cross-functional teams to deliver high-performance solutions. Improving checkout efficiency and reducing latency by 5% during peak traffic.'
        },
        {
          company: 'Amazon Web Services',
          position: 'AWS Cloud Captain',
          period: '2019 - 2021',
          description: 'Conducted 15+ workshops on AWS services for 300+ students, boosting cloud adoption by 50%. Deployed serverless applications using Lambda and S3, reducing infrastructure costs by 25%. Optimized data visualization dashboards in AWS QuickSight, improving report generation speed by 35%. Worked with AmazonChime to enable real-time communication with latency optimized to under 50 ms.'
        },
        {
          company: 'Centre for Innovation Incubation and Entrepreneurship',
          position: 'CIIE Team Lead',
          period: '2017 - 2019',
          description: 'Led development of an autonomous drone with LiDAR-based obstacle avoidance (85% accuracy). Autonomous Drone: Developed an autonomous drone with advanced navigation and obstacle avoidance capabilities. Built a student LMS using React and Spring Boot, adopted by 500+ users for academic management. Inventory Management System: Implemented a system to efficiently manage and track inventory using modern technologies. AI-Based Attendance Calculator System: Developed an AI-powered system to automate and optimise attendance tracking.'
        }
      ],
      certifications: [
        'AWS Certified Solutions Architect - Professional',
        'AWS Certified DevOps Engineer - Professional',
        'Certified Kubernetes Administrator (CKA)',
        'HashiCorp Certified: Terraform Associate'
      ]
    });
    setLoading(false);
    
    /* Commented out API fetch for now
    const fetchData = async () => {
      try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Mock data for development until backend is complete
        // ...mock data here...
        setLoading(false);
      }
    };
    fetchData();
    */
  }, []);

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  if (loading || !profileData) {
    return (
      <div className="flex-center" style={{ height: '100vh' }}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <main>
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Navbar />
      <Hero name={profileData.name} title={profileData.title} />
      <About />
      <Skills skills={profileData.skills} />
      <Projects projects={profileData.projects} />
      <Experience experiences={profileData.experience} />
      <Certifications certifications={profileData.certifications} />
      <Contact email={profileData.email} github={profileData.github} linkedin={profileData.linkedin} />
      <Footer />
    </main>
  );
}
