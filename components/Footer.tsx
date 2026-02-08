
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[rgb(10,10,10)] text-white pt-24 pb-12 overflow-hidden z-50">
      {/* Subtle Geometric Background Patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="600" r="400" stroke="white" strokeWidth="1" />
          <circle cx="1200" cy="200" r="300" stroke="white" strokeWidth="1" />
          <path d="M-100 400C100 200 400 600 700 400S1200 200 1500 400" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-12 relative z-10">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#E02424] shadow-[0_0_10px_rgba(224,36,36,0.5)]" />
            <span className="text-[11px] md:text-xs font-medium text-white/50 uppercase tracking-widest">Available for freelance</span>
          </motion.div>

          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-4 group"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Back to top</span>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
          </motion.button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 mb-32">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[clamp(40px,6vw,84px)] font-medium leading-[1.1] tracking-tightest mb-8">
              Let's create something extraordinary together<span className="text-[#E02424]">.</span>
            </h2>
            <p className="text-white/30 text-[18px] md:text-[22px] font-normal tracking-tight">
              Let's make an impact.
            </p>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-end"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Rostra Logo" className="w-16 h-16 object-contain scale-[2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-tight">Rostra agency</span>
                <div className="flex flex-col gap-1.5 mt-4 group/contact">
                  <a href="tel:+918603038778" className="text-sm text-white/60 hover:text-[#E02424] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#E02424]" />
                    +91 8603038778
                  </a>
                  <a href="tel:+917903082941" className="text-sm text-white/60 hover:text-[#E02424] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#E02424]" />
                    +91 7903082941
                  </a>
                </div>
                <div className="flex gap-3 mt-3">
                  <a href="#" className="opacity-30 hover:opacity-100 transition-opacity"><i className="fa-brands fa-instagram text-xs"></i></a>
                  <a href="https://wa.me/918603038778?text=Hi%21%20I%27m%20interested%20in%20working%20with%20Rostra.%20Can%20we%20discuss%20a%20project%3F" target="_blank" rel="noopener noreferrer" className="opacity-30 hover:opacity-100 transition-opacity">
                    <i className="fa-brands fa-whatsapp text-xs"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <span className="text-white/30 text-[11px] font-bold uppercase tracking-widest block mb-2">Contact me</span>
              <a href="mailto:info@rostra.in" className="text-[clamp(20px,3vw,32px)] font-medium hover:text-[#E02424] transition-colors break-all">
                info<span className="text-[#E02424]">@</span>rostra.in
              </a>
            </div>

            <p className="text-white/40 text-lg leading-relaxed mb-12 max-w-[440px]">
              Hit me up if you're looking for a <span className="text-white font-medium italic">fast, reliable</span> web partner who can bring your vision to life.
            </p>

            <div>
              <motion.button
                onClick={() => window.location.hash = '#book-a-call'}
                whileHover={{ scale: 1.02, backgroundColor: '#c51f1f' }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#E02424] text-white px-10 py-5 rounded-full flex items-center gap-4 group transition-all shadow-[0_10px_30px_rgba(224,36,36,0.3)]"
              >
                <span className="text-sm font-bold uppercase tracking-widest">Book a call</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-45">
                    <path d="M12 5V19M5 12l7-7 7 7" />
                  </svg>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 grayscale opacity-70 transition-opacity hover:opacity-100">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-0">
              <img src="/logo.png" alt="Rostra Logo" className="w-full h-full object-contain scale-[2]" />
            </div>
            <span className="text-[13px] font-bold tracking-tight">rostra <span className="text-white/40">agency</span></span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex gap-4">
              <a href="#privacy" className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors">Terms & Conditions</a>
            </div>
            <p className="text-[11px] md:text-xs text-white/20 font-medium tracking-wider">
              Copyright © Rostra Web Design and Development, 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
