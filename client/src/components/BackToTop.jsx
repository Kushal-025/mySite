import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 cursor-pointer flex items-center justify-center animate-in fade-in zoom-in-75"
      aria-label="Back to Top"
    >
      <ArrowUp size={19} />
    </button>
  );
}
