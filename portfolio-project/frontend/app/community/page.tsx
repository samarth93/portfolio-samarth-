'use client';

import { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Community from '../../components/Community';
import Footer from '../../components/Footer';

export default function CommunityPage() {
  // Set dark mode permanently
  useEffect(() => {
    document.body.classList.add('dark-mode');
  }, []);

  return (
    <main>
      <Navbar />
      <Community />
      <Footer />
    </main>
  );
} 