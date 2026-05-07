import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import SpaceBackground from './components/SpaceBackground';
import FloatingOrbs from './components/FloatingOrbs';
import Footer from './components/Footer';

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'} min-h-screen bg-space-900`}>
      {/* Background Effects */}
      <SpaceBackground mousePosition={mousePosition} />
      <FloatingOrbs />

      {/* Main Content */}
      <div className="relative z-10">
        <Navigation theme={theme} onThemeToggle={toggleTheme} />
        
        <main className="overflow-hidden">
          <HeroSection mousePosition={mousePosition} />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}