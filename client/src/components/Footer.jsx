import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { Mail, MapPin, ArrowUp } from 'lucide-react';

export default function Footer({ isDark }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative z-10 pt-16 pb-10 border-t ${
      isDark ? 'border-white/10 bg-[#02050e]' : 'border-slate-200 bg-slate-50'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Brand & Bio */}
          <div className="md:col-span-5 space-y-4 text-center md:text-left">
            <a href="#home" className="inline-block text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Kushal Banerjee
              </span>
            </a>
            <p className={`text-sm max-w-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Frontend & Full Stack Software Developer creating high-performance, modern web applications with React, Tailwind CSS, Node.js, and MongoDB.
            </p>
            <div className={`flex items-center justify-center md:justify-start gap-2 text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              <MapPin size={14} className="text-cyan-400" />
              <span>Ranchi, Jharkhand, India</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-3 text-center md:text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#home" className={`transition hover:text-indigo-400 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Home</a>
              <a href="#services" className={`transition hover:text-indigo-400 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Services</a>
              <a href="#about" className={`transition hover:text-indigo-400 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>About</a>
              <a href="#projects" className={`transition hover:text-indigo-400 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Projects</a>
              <a href="#resume" className={`transition hover:text-indigo-400 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Resume</a>
              <a href="#contact" className={`transition hover:text-indigo-400 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Contact</a>
            </div>
          </div>

          {/* Socials & Connect */}
          <div className="md:col-span-3 space-y-3 text-center md:text-right">
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Connect With Me
            </h4>
            <div className="flex items-center justify-center md:justify-end gap-3 pt-1">
              <a
                href="https://github.com/Kushal-025"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition duration-300 hover:scale-110 ${
                  isDark
                    ? 'border-white/10 bg-white/5 text-slate-300 hover:border-white hover:text-white hover:bg-white/10'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 shadow-sm'
                }`}
                aria-label="GitHub"
              >
                <FaGithub size={17} />
              </a>
              <a
                href="https://www.linkedin.com/in/kushal-banerjee-5195242b6"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition duration-300 hover:scale-110 ${
                  isDark
                    ? 'border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-500 hover:text-indigo-600 shadow-sm'
                }`}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={16} />
              </a>
              <a
                href="mailto:kushalbanerjee025@gmail.com"
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition duration-300 hover:scale-110 ${
                  isDark
                    ? 'border-white/10 bg-white/5 text-slate-300 hover:border-indigo-400 hover:text-indigo-400 hover:bg-indigo-500/10'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-500 hover:text-indigo-600 shadow-sm'
                }`}
                aria-label="Email"
              >
                <Mail size={17} />
              </a>
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              Open to opportunities & collaborations.
            </p>
          </div>
        </div>

        {/* Bottom Line & Copyright */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isDark ? 'border-white/5 text-slate-500' : 'border-slate-200 text-slate-500'
        }`}>
          <div>
            &copy; {new Date().getFullYear()} <span className="font-semibold text-slate-300">Kushal Banerjee</span>. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Built with React & Tailwind CSS</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 font-medium hover:text-indigo-400 transition cursor-pointer"
            >
              Back to top <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
