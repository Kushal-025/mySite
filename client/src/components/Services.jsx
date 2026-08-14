import React from 'react';
import { Code, Server, LayoutTemplate } from 'lucide-react';

export default function Services({ isDark }) {
  const services = [
    {
      title: 'Frontend Development',
      icon: <Code size={28} className="text-indigo-400" />,
      desc: 'Constructing scalable and modular user interfaces in React.js, Tailwind CSS, and JavaScript, with state management, clean DOM access, and lightning-fast load times.',
    },
    {
      title: 'Backend Integration',
      icon: <Server size={28} className="text-cyan-400" />,
      desc: 'Writing high-performance REST APIs in Node.js & Express.js, connecting NoSQL (MongoDB) or relational databases (MySQL), and setting up secure JWT authentication.',
    },
    {
      title: 'Responsive Engineering',
      icon: <LayoutTemplate size={28} className="text-purple-400" />,
      desc: 'Delivering mobile-first stylesheets using clean modern Tailwind CSS and CSS3 rules that align layouts seamlessly across all screen sizes (mobile, tablet, desktop).',
    },
  ];

  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 block">
            What I Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Specialized Services
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border transition-all duration-300 hover:scale-105 hover:-translate-y-2 group flex flex-col justify-between ${
                isDark
                  ? 'border-white/10 bg-[#0b0f19]/80 backdrop-blur-xl shadow-xl shadow-black/30 hover:border-indigo-500/50 hover:shadow-indigo-500/10'
                  : 'border-slate-200 bg-white shadow-lg shadow-slate-200/50 hover:border-indigo-400'
              }`}
            >
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {service.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center text-xs font-semibold text-indigo-400 group-hover:text-cyan-400 transition-colors">
                Production-Ready Delivery
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
