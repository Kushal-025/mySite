import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';

export default function Navbar({ isDark, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Resume', href: '#resume', id: 'resume' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'resume', 'services', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/65 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[94%] sm:w-[92%] max-w-5xl z-50 transition-all duration-300">
        <nav
          className={`flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-full transition-all duration-300 ${
            isDark
              ? 'bg-[#0b0f19]/90 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/40'
              : 'bg-white/90 border border-slate-200 backdrop-blur-xl shadow-lg shadow-slate-300/30'
          } ${isScrolled ? 'py-2 sm:py-2.5 shadow-indigo-500/10 border-indigo-500/30' : ''}`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-1 sm:gap-1.5 transition hover:scale-105 shrink-0"
          >
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              Kushal
            </span>
            <span className={isDark ? 'text-white' : 'text-slate-900'}>Banerjee</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 ${
                    activeSection === link.id
                      ? 'text-indigo-400 font-semibold'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <a
              href="https://github.com/Kushal-025"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 sm:p-2.5 rounded-full transition hover:scale-110 ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              aria-label="GitHub Profile"
            >
              <FaGithub size={17} />
            </a>
            <a
              href="https://www.linkedin.com/in/kushal-banerjee-5195242b6"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 sm:p-2.5 rounded-full transition hover:scale-110 ${
                isDark ? 'text-slate-400 hover:text-indigo-400 hover:bg-white/10' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
              }`}
              aria-label="LinkedIn Profile"
            >
              <FaLinkedinIn size={16} />
            </a>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition hover:rotate-45 cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-white/10 text-yellow-400 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition cursor-pointer ${
                isDark ? 'text-slate-300 hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden mt-2 p-5 rounded-2xl border transition-all duration-300 max-h-[80vh] overflow-y-auto ${
              isDark
                ? 'bg-[#0b0f19]/95 border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/80'
                : 'bg-white/95 border-slate-200 backdrop-blur-2xl shadow-xl'
            }`}
          >
            <ul className="flex flex-col gap-2 text-center">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2.5 px-4 rounded-xl text-base font-medium transition ${
                      activeSection === link.id
                        ? 'bg-indigo-600/20 text-indigo-400 font-semibold border border-indigo-500/30'
                        : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-white/5'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
