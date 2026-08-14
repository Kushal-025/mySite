import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

export default function Projects({ isDark }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Salon Business Website',
      category: 'web',
      categoryLabel: 'Web App',
      desc: 'Developed a responsive salon website improving online presence. Integrated a floating WhatsApp booking system, reducing appointment friction, and designed mobile-first components.',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'WhatsApp API'],
      liveUrl: 'https://salon-omega-steel.vercel.app',
      githubUrl: 'https://github.com/Kushal-025',
    },
    {
      id: 2,
      title: 'Wedding Service Landing Page',
      category: 'landing',
      categoryLabel: 'Landing Page',
      desc: 'Conversion-focused landing page for wedding service providers. Built with custom inquiry templates, mobile optimization, and integrated instant communication workflows.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
      liveUrl: 'https://wedding-one-murex.vercel.app',
      githubUrl: 'https://github.com/Kushal-025',
    },
    {
      id: 3,
      title: 'Tiffin Distribution Management System',
      category: 'web',
      categoryLabel: 'Full Stack App',
      desc: 'Full-stack food delivery management platform. Automated user roles, orders, and delivery pipelines using Express, MongoDB/MySQL, and REST APIs, cutting manual processing by 40%.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
      tech: ['Node.js', 'Express.js', 'MongoDB / MySQL', 'REST CRUD'],
      liveUrl: null,
      githubUrl: 'https://github.com/Kushal-025',
    },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 block">
            Showcase & Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center gap-3 mb-14">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'web', label: 'Web Apps' },
            { id: 'landing', label: 'Landing Pages' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 scale-105'
                  : isDark
                  ? 'bg-[#0b0f19] text-slate-400 hover:text-white border border-white/10'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:-translate-y-2 group ${
                isDark
                  ? 'border-white/10 bg-[#0b0f19]/90 shadow-xl shadow-black/40 hover:border-indigo-500/50'
                  : 'border-slate-200 bg-white shadow-lg shadow-slate-200/50 hover:border-indigo-400'
              }`}
            >
              <div>
                {/* Image Box */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-80" />

                  {/* Badges on top */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Action Link Icons */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-cyan-400 hover:scale-110 transition border border-white/10"
                        aria-label="View Source Code"
                      >
                        <FaGithub size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-cyan-500 hover:scale-110 transition shadow-lg"
                        aria-label="View Live Project"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {project.desc}
                  </p>
                </div>
              </div>

              {/* Tech stack tags */}
              <div className="p-6 pt-0">
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
                        isDark ? 'bg-white/5 text-slate-400 border border-white/5' : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
