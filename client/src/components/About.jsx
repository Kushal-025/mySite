import React from 'react';
import { 
  Code2, 
  Layers, 
  Database, 
  Server, 
  Terminal, 
  Smartphone, 
  GitBranch, 
  Cpu, 
  Award, 
  Clock, 
  Briefcase 
} from 'lucide-react';

export default function About({ isDark }) {
  const skills = [
    { name: 'React.js', icon: <Layers size={16} className="text-cyan-400" /> },
    { name: 'Tailwind CSS', icon: <Code2 size={16} className="text-cyan-400" /> },
    { name: 'JavaScript (ES6+)', icon: <Code2 size={16} className="text-yellow-400" /> },
    { name: 'Node.js & Express', icon: <Server size={16} className="text-green-400" /> },
    { name: 'MongoDB (Mongoose)', icon: <Database size={16} className="text-emerald-400" /> },
    { name: 'MySQL & REST APIs', icon: <Database size={16} className="text-blue-400" /> },
    { name: 'HTML5 & Modern CSS3', icon: <Code2 size={16} className="text-orange-400" /> },
    { name: 'Responsive Design', icon: <Smartphone size={16} className="text-purple-400" /> },
    { name: 'Git & GitHub', icon: <GitBranch size={16} className="text-red-400" /> },
    { name: 'Postman & VS Code', icon: <Terminal size={16} className="text-indigo-400" /> },
  ];

  const stats = [
    { number: '10+', label: 'Completed Projects', icon: <Layers size={22} className="text-indigo-400" /> },
    { number: '2', label: 'Internships Done', icon: <Briefcase size={22} className="text-cyan-400" /> },
    { number: '90%', label: 'Python & ML Grade', icon: <Award size={22} className="text-yellow-400" /> },
    { number: '1500+', label: 'Coding Hours', icon: <Clock size={22} className="text-emerald-400" /> },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 block">
            Biography & Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            About Me & Technical Skills
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Summary & Skills */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold">Summary</h3>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                I have hands-on experience building responsive, business-focused web applications.
                I've developed customer-facing solutions that improve booking workflows, streamline operations,
                and enhance user engagement. I possess a strong foundation in scalable web application design,
                clean component architectures, and Agile engineering.
              </p>
            </div>

            {/* Skills Badges Grid */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-bold">My Tech Stack</h4>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium border transition duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-default ${
                      isDark
                        ? 'border-white/10 bg-[#0b0f19]/90 text-slate-300 hover:border-indigo-500/50 hover:bg-white/5 shadow-md shadow-black/20'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-400 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-6 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 sm:gap-2 transition duration-300 hover:scale-105 hover:-translate-y-1 ${
                  isDark
                    ? 'border-white/10 bg-[#0b0f19]/80 backdrop-blur-xl shadow-lg shadow-black/30 hover:border-indigo-500/40'
                    : 'border-slate-200 bg-white shadow-md shadow-slate-200/50 hover:border-indigo-400'
                }`}
              >
                <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/5 mb-0.5 sm:mb-1">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className={`text-[11px] sm:text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
