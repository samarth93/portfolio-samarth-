'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Journey from '../components/Journey';
import CoreDomains from '../components/CoreDomains';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';


interface ProfileData {
  name: string;
  title: string;
  email: string;
  github: string;
  linkedin: string;
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

  useEffect(() => {
    // Set profile data directly (no backend required)
    setProfileData({
      name: 'Samarth',
      title: 'Cloud Developer & DevOps Engineer',
      email: 'palsamarth9@gmail.com',
      github: 'https://github.com/samarth93',
      linkedin: 'https://www.linkedin.com/in/samarth-pal-9701ba235/',
      certifications: [
        {
          title: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services',
          issuedDate: 'Issued: December 2024 · Expires: December 2026 · Candidate ID: AWS04819087'
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

  // Set dark mode permanently
  useEffect(() => {
    document.body.classList.add('dark-mode');
  }, []);

  if (loading || !profileData) {
    return (
      <div className="flex-center" style={{ height: '100vh' }}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <Hero name={profileData.name} title={profileData.title} />
      <Journey />
      <CoreDomains />
      <Projects />
      <Certifications certifications={profileData.certifications} />
      <Contact email={profileData.email} github={profileData.github} linkedin={profileData.linkedin} />
      <Footer />
    </main>
  );
}
