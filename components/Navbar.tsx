
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-8 md:px-12 py-8 flex justify-between items-center">
      <div className="flex items-center gap-4 group cursor-pointer">
        <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 100 100" className="w-6 h-6 text-white fill-current">
            <path d="M25 15h30c15 0 25 10 25 22s-10 22-25 22H45v26c0 0-20 0-20-5V15zm20 30h10c5 0 7-3 7-7s-2-7-7-7H45v14z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-neutral-900">Rostra</span>
          <span className="text-[10px] text-neutral-400 uppercase tracking-tighter">Studio</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {['Work', 'Services', 'About'].map((link) => (
          <a 
            key={link} 
            href={`#${link.toLowerCase()}`} 
            className="text-xs font-semibold text-neutral-400 hover:text-neutral-900 transition-colors tracking-wide uppercase"
          >
            {link}
          </a>
        ))}
        <button className="bg-neutral-900 text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-red-600 transition-all shadow-md active:scale-95">
          Get in touch
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
