import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const links = [
    { label: 'Home', href: '#home' },
    {
      label: 'Services',
      href: '#services',
      dropdown: [
        { label: 'Website Development', href: '#service-web-dev' },
        { label: 'Branding & Creative Services', href: '#service-branding' },
        { label: 'Lead Generation', href: '#service-lead-gen' },
        { label: 'Digital Marketing', href: '#service-digital-marketing' },
        { label: 'Advertising/ Performance Marketing', href: '#service-ads' },
      ]
    },
    { label: 'Our Works', href: '#projects' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-neutral-100 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-[clamp(24px,5vw,64px)] h-[88px] flex items-center justify-between">
        {/* Logo & Links Container */}
        <div className="flex items-center gap-16">
          {/* Logo */}
          <a href="#home" className="flex items-center group">
            <div className="h-20 w-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img src="/logo.png" alt="Rostra Logo" className="h-full w-auto object-contain" />
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.dropdown && setIsDropdownOpen(true)}
                onMouseLeave={() => link.dropdown && setIsDropdownOpen(false)}
              >
                <a
                  href={link.href}
                  className="text-[15px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1.5 py-8"
                >
                  {link.label}
                  {link.dropdown && (
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </a>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-[280px] bg-white border border-neutral-100 rounded-2xl shadow-xl shadow-neutral-900/5 p-2 z-[110]"
                      >
                        {link.dropdown.map((sublink) => (
                          <a
                            key={sublink.label}
                            href={sublink.href}
                            className="flex items-center px-4 py-3 text-[14px] text-neutral-500 hover:text-[#E02424] hover:bg-red-50 rounded-xl transition-all font-medium"
                          >
                            {sublink.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-neutral-900 flex flex-col gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center justify-center px-8 py-3 bg-[#111] text-white text-[14px] font-bold rounded-full shadow-lg shadow-neutral-900/10 hover:bg-[#E02424] hover:shadow-red-500/25 hover:-translate-y-[1px] transition-all duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-neutral-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {links.map((link) => (
                <React.Fragment key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => !link.dropdown && setIsOpen(false)}
                    className="text-lg font-medium text-neutral-900 py-4 border-b border-neutral-50 last:border-0 flex justify-between items-center"
                  >
                    {link.label}
                    {link.dropdown && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsDropdownOpen(!isDropdownOpen);
                        }}
                        className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center"
                      >
                        <svg width="12" height="8" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                  </a>
                  {link.dropdown && isDropdownOpen && (
                    <div className="bg-neutral-50 rounded-2xl p-2 flex flex-col gap-1 mb-4">
                      {link.dropdown.map((sublink) => (
                        <a
                          key={sublink.label}
                          href={sublink.href}
                          onClick={() => {
                            setIsOpen(false);
                            setIsDropdownOpen(false);
                          }}
                          className="px-4 py-3 text-[15px] text-neutral-600 font-medium"
                        >
                          {sublink.label}
                        </a>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
              <div className="pt-4">
                <a href="#contact" onClick={() => setIsOpen(false)} className="block w-full py-4 bg-[#E02424] text-white text-center rounded-xl font-bold shadow-lg shadow-red-500/20">
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
