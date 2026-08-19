import React from 'react';
import { GraduationCap, Briefcase, Calendar, CheckCircle } from 'lucide-react';

export default function Resume({ isDark }) {
  const education = [
    {
      title: 'B.Sc. Information Technology',
      org: 'Information Technology Department',
      date: 'Graduating Aug 2025',
      desc: 'Acquired strong concepts in databases, computer networks, data structures, and full-stack software development pipelines.',
    },
    {
      title: 'Python with Machine Learning Certification',
      org: 'Certification | Grade A+ (90%) | ID: EMCE940435',
      date: 'Certified',
      desc: 'Specialized certificate program focused on predictive models, data wrangling, and classification workflows.',
    },
  ];

  const experience = [
    {
      title: 'Web Development Intern',
      org: 'CITC – The Hub of IT',
      date: 'Jul 2025 – Sep 2025',
      desc: 'Built responsive web applications using JavaScript, HTML5, CSS3, and REST APIs across multiple client projects. Implemented interactive UI components and CRUD workflows to improve usability and maintainability. Collaborated in Agile environments using Git/GitHub.',
    },
    {
      title: 'Python & Machine Learning Intern',
      org: 'E-MAX India',
      date: 'May 2025 – Jun 2025',
      desc: 'Developed classification models using Decision Trees, KNN, and SVM. Executed exploratory data analysis (EDA), training, evaluation, and optimization workflows. Achieved Grade A+ in assessments.',
    },
  ];

  return (
    <section id="resume" className="py-16 sm:py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 block">
            Journey & Background
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Education & Internships
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Education Column */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <GraduationCap size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">Education & Certifications</h3>
            </div>

            <div className="space-y-5 sm:space-y-6 border-l-2 border-indigo-500/30 pl-4 sm:pl-6 ml-2 sm:ml-4">
              {education.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-5 sm:p-6 rounded-2xl border transition duration-300 hover:scale-[1.02] relative ${
                    isDark
                      ? 'border-white/10 bg-[#0b0f19]/80 shadow-md shadow-black/20 hover:border-indigo-500/40'
                      : 'border-slate-200 bg-white shadow-sm hover:border-indigo-400'
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute -left-[23px] sm:-left-[31px] top-6 w-3.5 h-3.5 rounded-full bg-indigo-500 ring-4 ring-[#030712]" />

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-2.5 sm:mb-3">
                    <Calendar size={12} /> {item.date}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold">{item.title}</h4>
                  <p className="text-xs font-semibold text-cyan-400 mt-0.5 mb-2">{item.org}</p>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Briefcase size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">Internship Experience</h3>
            </div>

            <div className="space-y-5 sm:space-y-6 border-l-2 border-cyan-500/30 pl-4 sm:pl-6 ml-2 sm:ml-4">
              {experience.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-5 sm:p-6 rounded-2xl border transition duration-300 hover:scale-[1.02] relative ${
                    isDark
                      ? 'border-white/10 bg-[#0b0f19]/80 shadow-md shadow-black/20 hover:border-cyan-500/40'
                      : 'border-slate-200 bg-white shadow-sm hover:border-cyan-400'
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute -left-[23px] sm:-left-[31px] top-6 w-3.5 h-3.5 rounded-full bg-cyan-400 ring-4 ring-[#030712]" />

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-2.5 sm:mb-3">
                    <Calendar size={12} /> {item.date}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold">{item.title}</h4>
                  <p className="text-xs font-semibold text-indigo-400 mt-0.5 mb-2">{item.org}</p>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
