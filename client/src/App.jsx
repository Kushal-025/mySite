import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio_theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('portfolio_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <div
      className={`min-h-screen relative selection:bg-indigo-500 selection:text-white transition-colors duration-500 ${
        isDark
          ? 'bg-[#030712] text-slate-100 bg-grid-pattern'
          : 'bg-[#f8fafc] text-slate-900 bg-grid-pattern-light'
      }`}
    >
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Dynamic Background Particle System */}
      <ParticleBackground />

      {/* Floating Header */}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main className="relative">
        <Hero isDark={isDark} />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <About isDark={isDark} />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <Resume isDark={isDark} />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <Services isDark={isDark} />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <Projects isDark={isDark} />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <Contact isDark={isDark} />
      </main>

      {/* Back to top floating button */}
      <BackToTop />

      {/* Footer */}
      <Footer isDark={isDark} />
    </div>
  );
}
