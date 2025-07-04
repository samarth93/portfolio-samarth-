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
    githubLink?: string;
  }[];
  experience: {
    company: string;
    position: string;
    period: string;
    description: string;
  }[];
  certifications: {
    title: string;
    issuer: string;
    issuedDate: string;
    link?: string;
  }[];
}

export default function HomePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Set profile data directly (no backend required)
    setProfileData({
      name: 'Samarth',
      title: 'Cloud Developer & DevOps Engineer',
      email: 'palsamarth9@gmail.com',
      github: 'https://github.com/samarth93',
      linkedin: 'https://www.linkedin.com/in/samarth-pal-9701ba235/',
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
          title: 'CI/CD Pipeline on AWS',
          description: 'Designed and implemented a robust CI/CD pipeline using AWS services to automate the building, testing, and deployment of applications from GitHub to a live website hosted on EC2.',
          technologies: 'AWS CodeCommit, AWS CodeArtifact, AWS CodeBuild, AWS CodeDeploy, AWS CodePipeline, Amazon EC2, Amazon S3, AWS CloudFormation',
          githubLink: 'https://github.com/samarth93/CI-CD-AWS'
        },
        {
          title: 'Three-Tier Web Application Architecture on AWS',
          description: 'Built a secure, serverless three-tier web application with user authentication, static content delivery, API-driven backend, and dynamic data storage.',
          technologies: 'Amazon Cognito, Amazon CloudFront, Amazon S3, Amazon API Gateway, AWS Lambda, Amazon DynamoDB',
          githubLink: 'https://github.com/samarth93/Three-Tier-Architecture'
        },
        {
          title: 'InsurTech',
          description: 'Developed a custom insurance application that enables users to build personalized insurance policies by combining features from existing plans.',
          technologies: 'Node.js, MongoDB, Java',
          githubLink: 'https://github.com/samarth93/insurance-application-'
        },
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
        {
          title: 'AWS Certified Solutions Architect - Professional',
          issuer: 'Amazon Web Services',
          issuedDate: 'Issued: October 2022 · Expires: October 2025'
        },
        {
          title: 'AWS Certified DevOps Engineer - Professional',
          issuer: 'Amazon Web Services',
          issuedDate: 'Issued: July 2022 · Expires: July 2025'
        },
        {
          title: 'Certified Kubernetes Administrator (CKA)',
          issuer: 'Cloud Native Computing Foundation',
          issuedDate: 'Issued: March 2023 · Expires: March 2026'
        },
        {
          title: 'HashiCorp Certified: Terraform Associate',
          issuer: 'HashiCorp',
          issuedDate: 'Issued: January 2023 · Expires: January 2025'
        },
        {
          title: 'Certificate of Participation – Industry-Academia Collaboration with MSMEs',
          issuer: 'BOSCH',
          issuedDate: 'Issued: February 28, 2023 · Lifetime'
        },
        {
          title: 'Certificate of Appreciation – RC Car Bootcamp (36 hours)',
          issuer: 'Centre for Innovation, Incubation, and Entrepreneurship (CIIE)',
          issuedDate: 'Lifetime'
        },
        {
          title: 'Certificate of Appreciation – Organizer, 36-Hour Hackathon',
          issuer: 'Centre for Innovation, Incubation, and Entrepreneurship (CIIE)',
          issuedDate: 'Lifetime'
        },
        {
          title: 'Certificate of Completion – Web Development Workshop',
          issuer: 'Centre for Innovation, Incubation, and Entrepreneurship (CIIE)',
          issuedDate: 'Lifetime'
        },
        {
          title: 'Certificate of Participation – SRM Builds 1.0',
          issuer: 'Centre for Innovation, Incubation, and Entrepreneurship (CIIE)',
          issuedDate: 'No expiration'
        },
        {
          title: 'Certificate of Appreciation – Arduino Training, IoT Training, RC Car & Drone Workshop',
          issuer: 'Centre for Innovation, Incubation, and Entrepreneurship (CIIE)',
          issuedDate: 'Lifetime'
        },
        {
          title: 'Certificate of Completion – Arduino Training and RC Car Workshop',
          issuer: 'Centre for Innovation, Incubation, and Entrepreneurship (CIIE)',
          issuedDate: 'No expiration'
        },
        {
          title: 'Certificate of Participation – Debate "Jagaana Desh Hai Apna"',
          issuer: 'SRM University, Department of Law',
          issuedDate: 'Issued: February 14, 2023 · Lifetime'
        },
        {
          title: 'Certificate of Participation – Industrial Collaboration with MSMEs & SCoE',
          issuer: 'BOSCH',
          issuedDate: 'Issued: October 26, 2023 · Lifetime'
        },
        {
          title: 'SRM Builds x FinTech 5.0 – Winner',
          issuer: 'Centre for Innovation, Incubation, and Entrepreneurship (CIIE)',
          issuedDate: 'Lifetime'
        }
      ]
    });
    setLoading(false);
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
