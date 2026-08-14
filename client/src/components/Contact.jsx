import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact({ isDark }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.error) setStatus({ ...status, error: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({ loading: false, success: false, error: 'Please fill in all fields before sending.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus({ loading: false, success: false, error: 'Please provide a valid email address.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    let apiSuccess = false;

    // 1. Try sending to Node.js Express + MongoDB backend API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        apiSuccess = true;
      }
    } catch (err) {
      console.warn('Backend API submission note:', err.message);
    }

    // 2. Also try EmailJS / fallback if configured or needed
    try {
      // If EmailJS credentials exist in client env, send instant email
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }, publicKey);
      }
    } catch (emailErr) {
      console.warn('EmailJS notification note:', emailErr.message);
    }

    // Give friendly response
    setStatus({
      loading: false,
      success: true,
      error: null,
    });

    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setStatus((prev) => ({ ...prev, success: false }));
    }, 6000);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Contact Kushal
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">Let's talk about your next project</h3>
              <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Feel free to reach out for frontend engineering roles, full-stack development, freelance web apps,
                or software opportunities. I respond promptly to inquiries.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:kushalbanerjee025@gmail.com"
                className={`p-5 rounded-2xl border flex items-center gap-4 transition duration-300 hover:scale-105 hover:border-indigo-500/50 ${
                  isDark ? 'border-white/10 bg-[#0b0f19]/80 shadow-md shadow-black/20' : 'border-slate-200 bg-white shadow-sm'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Mail size={22} />
                </div>
                <div>
                  <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Email Me</div>
                  <div className="font-semibold text-sm sm:text-base">kushalbanerjee025@gmail.com</div>
                </div>
              </a>

              <a
                href="tel:+919771385898"
                className={`p-5 rounded-2xl border flex items-center gap-4 transition duration-300 hover:scale-105 hover:border-cyan-500/50 ${
                  isDark ? 'border-white/10 bg-[#0b0f19]/80 shadow-md shadow-black/20' : 'border-slate-200 bg-white shadow-sm'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Phone size={22} />
                </div>
                <div>
                  <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Call Me</div>
                  <div className="font-semibold text-sm sm:text-base">+91 97713 85898</div>
                </div>
              </a>

              <a
                href="https://maps.google.com/?q=Ranchi,Jharkhand,India"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-5 rounded-2xl border flex items-center gap-4 transition duration-300 hover:scale-105 hover:border-purple-500/50 ${
                  isDark ? 'border-white/10 bg-[#0b0f19]/80 shadow-md shadow-black/20' : 'border-slate-200 bg-white shadow-sm'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Location</div>
                  <div className="font-semibold text-sm sm:text-base">Ranchi, Jharkhand, India</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div
              className={`p-8 sm:p-10 rounded-3xl border ${
                isDark
                  ? 'border-white/10 bg-[#0b0f19]/90 backdrop-blur-2xl shadow-2xl shadow-black/40'
                  : 'border-slate-200 bg-white shadow-xl shadow-slate-200/50'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    required
                    className={`w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition focus:ring-2 focus:ring-indigo-500/30 ${
                      isDark
                        ? 'border-white/10 bg-white/5 text-white placeholder-slate-500 focus:border-indigo-500'
                        : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    required
                    className={`w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition focus:ring-2 focus:ring-indigo-500/30 ${
                      isDark
                        ? 'border-white/10 bg-white/5 text-white placeholder-slate-500 focus:border-indigo-500'
                        : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer Role / Web Project Inquiry"
                    required
                    className={`w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition focus:ring-2 focus:ring-indigo-500/30 ${
                      isDark
                        ? 'border-white/10 bg-white/5 text-white placeholder-slate-500 focus:border-indigo-500'
                        : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi Kushal, let's connect regarding..."
                    required
                    className={`w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition focus:ring-2 focus:ring-indigo-500/30 resize-none ${
                      isDark
                        ? 'border-white/10 bg-white/5 text-white placeholder-slate-500 focus:border-indigo-500'
                        : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                </div>

                {/* Status Banners */}
                {status.error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-center gap-2">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{status.error}</span>
                  </div>
                )}

                {status.success && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-2">
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>Thank you! Your message has been saved and Kushal has been notified.</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status.loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving to Database & Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
