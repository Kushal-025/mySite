import React from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';

export default function Hero({ isDark }) {
  return (
    <section id="home" className="min-h-screen pt-32 pb-20 flex items-center relative z-10">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Frontend Developer | React Developer | Full Stack
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent sm:whitespace-nowrap">
                Kushal Banerjee
              </span>
            </h1>

            {/* Subtext */}
            <p className={`text-sm sm:text-lg max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              I build responsive, business-focused web applications using React.js, Tailwind CSS, JavaScript, Node.js, and MongoDB.
              I craft customer-facing solutions that improve workflows, streamline operations, and boost user engagement.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                Contact Me <ArrowRight size={17} />
              </a>

              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border transition duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                  isDark
                    ? 'border-white/15 bg-white/5 hover:bg-white/10 text-white'
                    : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-sm'
                }`}
              >
                View / Download CV <Download size={17} />
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/kushal-banerjee-5195242b6"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-full flex items-center justify-center border transition duration-300 hover:scale-110 hover:-translate-y-1 ${
                  isDark
                    ? 'border-white/10 bg-white/5 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10'
                    : 'border-slate-200 bg-white text-slate-600 hover:text-indigo-600 hover:border-indigo-400/50 shadow-sm'
                }`}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={17} />
              </a>
              <a
                href="https://github.com/Kushal-025"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-full flex items-center justify-center border transition duration-300 hover:scale-110 hover:-translate-y-1 ${
                  isDark
                    ? 'border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/10'
                    : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-400 shadow-sm'
                }`}
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="mailto:kushalbanerjee025@gmail.com"
                className={`w-11 h-11 rounded-full flex items-center justify-center border transition duration-300 hover:scale-110 hover:-translate-y-1 ${
                  isDark
                    ? 'border-white/10 bg-white/5 text-slate-400 hover:text-indigo-400 hover:border-indigo-400/50 hover:bg-indigo-500/10'
                    : 'border-slate-200 bg-white text-slate-600 hover:text-indigo-600 hover:border-indigo-400/50 shadow-sm'
                }`}
                aria-label="Email Kushal"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          {/* Right Hero Image Container with Animated Glow */}
          <div className="lg:col-span-5 flex justify-center items-center relative my-4 sm:my-0">
            {/* Spinning decorative ring */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-full border-2 border-dashed border-cyan-400/30 animate-spin-slow pointer-events-none" />

            {/* Glowing gradient background */}
            <div className="w-56 h-56 sm:w-80 sm:h-80 rounded-full p-2 sm:p-2.5 bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 shadow-2xl shadow-indigo-600/30 transition-transform duration-500 hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#030712] bg-[#0b0f19] relative group">
                <img
                  src="/kushal-profile.jpg"
                  alt="Kushal Banerjee Profile"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
