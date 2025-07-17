'use client';

import { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Insights from '../../components/Insights';
import Footer from '../../components/Footer';

export default function InsightsPage() {
  // Set dark mode permanently
  useEffect(() => {
    document.body.classList.add('dark-mode');
  }, []);

  return (
    <main>
      <Navbar />
      <Insights />
      <Footer />
    </main>
  );
} 