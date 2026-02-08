
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// --- Inline Widgets for Headline ---

const InlineBrowser = () => (
  <motion.div
    className="inline-flex align-middle mx-2 md:mx-4 relative -top-1 md:-top-3"
    whileHover={{ scale: 1.05, rotate: -3 }}
    initial={{ y: 0 }}
    animate={{ y: [-6, 6, -6] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="w-[90px] md:w-[130px] h-[60px] md:h-[84px] bg-white rounded-xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] border border-neutral-200 flex flex-col overflow-visible relative z-10 cursor-default">
      {/* Header */}
      <div className="h-5 md:h-6 bg-neutral-50/80 border-b border-neutral-100 flex items-center px-2.5 gap-1.5 rounded-t-xl backdrop-blur-sm">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]"></div>
        <div className="w-2 h-2 rounded-full bg-[#febc2e]"></div>
        <div className="w-2 h-2 rounded-full bg-[#28c840]"></div>
      </div>

      {/* Content - Realistic Dashboard Visual */}
      <div className="p-2 flex-1 flex flex-col gap-1.5 overflow-hidden">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-red-50 flex items-center justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <div className="h-1.5 w-10 bg-neutral-100 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-1.5 mt-0.5">
          <div className="h-4 bg-neutral-50 rounded border border-neutral-100/50 flex items-center justify-center overflow-hidden px-1">
            <div className="w-full h-[2px] bg-red-200 rounded-full"></div>
          </div>
          <div className="h-4 bg-neutral-50 rounded border border-neutral-100/50 flex items-center justify-center overflow-hidden px-1">
            <div className="w-full h-[2px] bg-blue-200 rounded-full"></div>
          </div>
        </div>
        <div className="h-2 w-full bg-neutral-50 rounded border border-neutral-100/50 mt-auto"></div>
      </div>

      {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute -right-3 -bottom-2 z-20"
      >
        <div className="bg-[#6366f1] text-white text-[9px] md:text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg border-[2px] border-white flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
          Dev
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const InlineApp = () => (
  <motion.div
    className="inline-flex align-middle mx-2 md:mx-4 relative -top-1 md:-top-3"
    whileHover={{ scale: 1.05, rotate: 3 }}
    initial={{ y: 0 }}
    animate={{ y: [6, -6, 6] }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
  >
    <div className="w-[60px] md:w-[80px] h-[80px] md:h-[100px] bg-white rounded-[18px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] border border-neutral-200 p-1.5 flex flex-col relative z-10 cursor-default">
      <div className="w-full h-full bg-neutral-50 rounded-[12px] flex flex-col items-center justify-center gap-1.5 p-1.5 border border-neutral-100 overflow-hidden">
        {/* Realistic Growth Graph Visual */}
        <div className="w-full h-full relative flex items-end justify-between px-1">
          <motion.div initial={{ height: "20%" }} animate={{ height: "40%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} className="w-[3px] bg-orange-200 rounded-t-full"></motion.div>
          <motion.div initial={{ height: "30%" }} animate={{ height: "70%" }} transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }} className="w-[3px] bg-orange-300 rounded-t-full"></motion.div>
          <motion.div initial={{ height: "50%" }} animate={{ height: "90%" }} transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }} className="w-[3px] bg-orange-500 rounded-t-full"></motion.div>
          <motion.div initial={{ height: "40%" }} animate={{ height: "60%" }} transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse" }} className="w-[3px] bg-orange-400 rounded-t-full"></motion.div>
          <motion.div initial={{ height: "60%" }} animate={{ height: "80%" }} transition={{ duration: 2.8, repeat: Infinity, repeatType: "reverse" }} className="w-[3px] bg-orange-600 rounded-t-full"></motion.div>
        </div>
      </div>

      {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-20"
      >
        <div className="bg-[#f97316] text-white text-[9px] md:text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg border-[2px] border-white">
          SEO
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// --- Existing Components for Bottom Section ---

const CompanyLogo: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => (
  <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300 cursor-default grayscale hover:grayscale-0 group">
    <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center transition-colors">
      {children}
    </div>
    <span className="text-sm md:text-base font-bold tracking-tight text-neutral-400 group-hover:text-neutral-900 transition-colors hidden md:inline-block">{name}</span>
  </div>
);

const FloatingSticker: React.FC<{ icon: string; color: string; rotate?: number; delay?: number; className?: string }> = ({ icon, color, rotate = 0, delay = 0, className }) => (
  <motion.div
    drag
    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
    whileDrag={{ scale: 1.2, cursor: "grabbing", zIndex: 50 }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1, y: [0, -8, 0], rotate: [rotate - 3, rotate + 3, rotate - 3] }}
    transition={{
      opacity: { duration: 0.5, delay },
      scale: { type: "spring", stiffness: 200, damping: 15, delay },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 },
      rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }
    }}
    whileHover={{ scale: 1.1, rotate: 0, cursor: "grab" }}
    style={{ willChange: 'transform, opacity' }}
    className={`absolute z-30 bg-white p-3.5 rounded-2xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.1)] border border-neutral-100 flex items-center justify-center ${className}`}
  >
    <i className={`${icon} text-2xl md:text-3xl ${color}`}></i>
  </motion.div>
);

const StickyNote: React.FC<{ text: string; className?: string; rotate?: number }> = ({ text, className, rotate = 0 }) => (
  <motion.div
    drag
    dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
    whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 50 }}
    whileHover={{ scale: 1.05, cursor: "grab" }}
    initial={{ opacity: 0, scale: 0.8, rotate: rotate }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1, type: "spring" }}
    className={`absolute z-30 bg-[#FFF740] text-neutral-900 p-4 w-32 h-32 shadow-lg flex items-center justify-center text-center leading-tight font-medium ${className}`}
    style={{ borderRadius: '2px 2px 20px 2px' }} // Folded corner effect
  >
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/40 -rotate-2 backdrop-blur-[1px]"></div> {/* Tape */}
    <span className="font-handwriting text-sm">{text}</span>
  </motion.div>
);

const Cursor: React.FC<{ label: string; color: string; x: number; y: number; delay?: number }> = ({ label, color, x, y, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: x - 50, y: y + 50 }}
    animate={{ opacity: 1, x: [x, x + 40, x - 20, x], y: [y, y - 40, y + 10, y] }}
    transition={{
      opacity: { duration: 0.5, delay },
      default: { duration: 12, repeat: Infinity, ease: "easeInOut", delay }
    }}
    className="absolute z-40 pointer-events-none drop-shadow-xl hidden md:block"
    style={{ top: 0, left: 0 }}
  >
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 5L25 15.5L16.5 18L13 25.5L7.5 5Z" fill={color} stroke="white" strokeWidth="2" />
    </svg>
    <div className="text-white text-[10px] font-bold px-2 py-1 rounded ml-4 mt-1 shadow-sm whitespace-nowrap" style={{ backgroundColor: color }}>
      {label}
    </div>
  </motion.div>
);

const Hero: React.FC = () => {
  const containerRef = useRef(null);

  return (
    <section id="home" ref={containerRef} className="relative w-full pt-32 pb-24 px-6 md:px-8 bg-[#fcfcfc] overflow-hidden flex flex-col items-center">

      {/* --- Background Patterns & Texture --- */}

      {/* 1. Technical Grid (Graph paper effect) - Fades out at edges */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
                linear-gradient(to right, #000 1px, transparent 1px),
                linear-gradient(to bottom, #000 1px, transparent 1px)
             `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />

      {/* 2. Micro-dots (Texture) - Adds 'paper' feel */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#111 0.5px, transparent 0.5px)',
          backgroundSize: '12px 12px'
        }}
      />

      {/* 3. Subtle Grain/Noise Overlay - Removes digital flatness */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 4. Large Geometric Accents (The "Impact") */}
      <svg className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-visible opacity-[0.03]">
        <circle cx="0" cy="0" r="500" fill="none" stroke="currentColor" strokeWidth="2" className="text-black" />
        <circle cx="100%" cy="20%" r="400" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="12 12" className="text-red-600" />
        <path d="M-100,200 Q400,300 800,100 T1800,200" fill="none" stroke="currentColor" strokeWidth="2" className="text-black" />
      </svg>

      {/* Subtle Warm Glows (Replaced multi-color with neutral/warm) */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />


      {/* 1. Main Headline Section */}
      <div className="max-w-[1200px] mx-auto text-center relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-100 text-neutral-600 text-xs font-bold uppercase tracking-widest mb-8 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E02424]"></span>
          </span>
          Available for new projects
        </motion.div>

        {/* Updated Headline with Inline Elements */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.5rem,5.5vw,5rem)] font-bold tracking-tight leading-[1.2] text-neutral-900 mb-8 max-w-[1100px] mx-auto"
        >
          Iconic
          <InlineBrowser />
          Websites, <br className="hidden md:block" />

          Bold Strategies, &
          <InlineApp />
          Limitless <span className="relative inline-block text-[#E02424]">
            Growth
            <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-[12px] md:h-[18px] pointer-events-none overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
              <motion.path
                d="M5,15 Q30,5 50,15 T95,10"
                fill="none"
                stroke="#E02424"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
              />
              <motion.path
                d="M10,18 Q40,8 60,18 T90,12"
                fill="none"
                stroke="#E02424"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeInOut" }}
              />
            </svg>
          </span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-neutral-500 font-medium max-w-[680px] mx-auto leading-relaxed mb-10"
        >
          Rostra is the digital agency that turns <span className="text-neutral-900 font-bold decoration-red-100 decoration-2 underline-offset-2">browsers</span> into <span className="text-neutral-900 font-bold decoration-red-100 decoration-2 underline-offset-2">buyers</span> with bold design & flawless code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#contact" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#111] text-white rounded-[14px] font-bold text-base hover:bg-[#E02424] hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-1 transition-all duration-300 active:scale-95 group">
            Start your project
            <i className="fa-solid fa-arrow-right text-sm ml-1 group-hover:translate-x-1 transition-transform"></i>
          </a>
          <a href="#projects" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-600 rounded-[14px] font-bold text-base border border-neutral-200 hover:text-[#E02424] hover:border-red-100 hover:bg-red-50 transition-all duration-300 active:scale-95">
            View our work
          </a>
        </motion.div>
      </div>

      {/* 2. Central Visual (Mockup) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-[1000px] mx-auto z-20 mb-24"
      >
        {/* Fun Elements - Draggable Stickers & Notes */}
        <FloatingSticker icon="fa-brands fa-figma" color="text-black" rotate={-8} className="-top-12 -right-4 md:-right-16" delay={0.6} />
        <FloatingSticker icon="fa-solid fa-bolt" color="text-[#E02424]" rotate={12} className="-top-8 -left-4 md:-left-12" delay={0.7} />
        <FloatingSticker icon="fa-solid fa-code" color="text-neutral-700" rotate={-5} className="top-[40%] -left-8 md:-left-20" delay={0.8} />

        <StickyNote text="Launch this friday 🚀" className="bottom-[15%] -right-8 md:-right-20" rotate={-3} />

        {/* Main Window */}
        <div className="relative bg-white rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] border border-neutral-200 overflow-hidden">

          {/* Window Chrome */}
          <div className="h-10 bg-[#FAFAFA] border-b border-neutral-100 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/30 group-hover:bg-red-400 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400/30 group-hover:bg-yellow-400 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-400/30 group-hover:bg-green-400 transition-colors"></div>
            </div>
            <div className="ml-4 flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-neutral-100 shadow-sm transition-colors hover:border-red-200 min-w-[200px]">
              <i className="fa-solid fa-lock text-[10px] text-neutral-300"></i>
              <span className="text-[11px] text-neutral-400 font-medium">rostra.com/dashboard</span>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 md:p-10 bg-white min-h-[400px] md:min-h-[500px] flex flex-col relative">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-white border border-red-100 flex items-center justify-center text-[#E02424] shadow-sm">
                  <i className="fa-solid fa-layer-group text-xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                    Website Launch
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-extrabold uppercase tracking-wide">Live</span>
                  </h3>
                  <p className="text-sm text-neutral-400">Q3 2024 — Launch Strategy</p>
                </div>
              </div>
              <div className="flex items-center -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <motion.div
                    whileHover={{ y: -5, scale: 1.1, zIndex: 10 }}
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white bg-neutral-100 overflow-hidden cursor-pointer shadow-sm relative"
                  >
                    <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" className="w-full h-full object-cover" />
                    {i === 1 && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>}
                  </motion.div>
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-white bg-[#111] flex items-center justify-center text-white text-xs font-bold shadow-sm hover:bg-[#E02424] transition-colors cursor-pointer">+3</div>
              </div>
            </div>

            {/* Kanban/Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">

              {/* Column 1: Strategy */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-yellow-50 text-yellow-700 border border-yellow-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Planning</span>
                  <span className="text-xs text-neutral-400 font-medium">3 tasks</span>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-4 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all cursor-pointer group bg-white"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-semibold text-neutral-800 group-hover:text-[#E02424] transition-colors">Market Analysis</span>
                    <i className="fa-regular fa-file-lines text-neutral-300"></i>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-6 h-1 rounded-full bg-neutral-200"></span>
                    <span className="w-4 h-1 rounded-full bg-neutral-200"></span>
                  </div>
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-4 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all cursor-pointer group bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-neutral-800 group-hover:text-[#E02424] transition-colors">Brand Identity</span>
                    <i className="fa-solid fa-pen-nib text-neutral-300"></i>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <span className="px-2 py-1 bg-red-50 text-red-500 text-[10px] font-bold rounded">High Priority</span>
                  </div>
                </motion.div>
              </div>

              {/* Column 2: In Progress */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase">In Progress</span>
                  <span className="text-xs text-neutral-400 font-medium">2 tasks</span>
                </div>

                {/* Active Card - Main Focus */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-xl border border-[#E02424]/20 shadow-[0_15px_40px_-10px_rgba(224,36,36,0.15)] bg-white relative"
                >
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#E02424] animate-pulse"></div>
                  <div className="mb-3">
                    <h4 className="text-base font-bold text-neutral-900 mb-1">Hero Redesign</h4>
                    <p className="text-xs text-neutral-500">Implementing new layout...</p>
                  </div>

                  <div className="items-center justify-between mt-4 pt-4 border-t border-neutral-50 hidden md:flex">
                    <div className="flex items-center gap-2">
                      <i className="fa-brands fa-react text-blue-400"></i>
                      <span className="text-xs font-mono text-neutral-400">React / TS</span>
                    </div>
                    <div className="flex -space-x-1">
                      <img src="https://i.pravatar.cc/100?img=12" className="w-5 h-5 rounded-full border border-white" alt="" />
                      <img src="https://i.pravatar.cc/100?img=33" className="w-5 h-5 rounded-full border border-white" alt="" />
                    </div>
                  </div>
                </motion.div>

                {/* Card */}
                <div className="p-4 rounded-xl border border-neutral-100 shadow-sm bg-white/50 opacity-60">
                  <span className="text-sm font-semibold text-neutral-800">Mobile Optimization</span>
                </div>
              </div>

              {/* Column 3: Stats */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Results</span>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-gradient-to-b from-neutral-50 to-white border border-neutral-100"
                >
                  <div className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-2">Conversion Rate</div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-neutral-900">4.8%</span>
                    <span className="text-xs text-green-600 font-bold mb-1.5 flex items-center bg-green-50 px-1.5 py-0.5 rounded">
                      <i className="fa-solid fa-arrow-trend-up mr-1"></i> 12%
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "70%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-green-500"
                    />
                  </div>
                </motion.div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-2">Load Time</div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-neutral-900">0.4s</span>
                    <span className="text-xs text-green-600 font-bold mb-1.5">Elite</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Live Cursors - The "Fun" Part */}
            <Cursor
              label="Deploying..."
              color="#E02424"
              x={250}
              y={0}
              delay={0}
            />

            {/* Second Cursor - Designer */}
            <motion.div
              initial={{ opacity: 0, top: "20%", left: "10%" }}
              animate={{ opacity: 1, top: ["20%", "25%", "20%"], left: ["10%", "30%", "10%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute z-40 pointer-events-none drop-shadow-xl hidden md:block"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 5L25 15.5L16.5 18L13 25.5L7.5 5Z" fill="#111" stroke="white" strokeWidth="2" />
              </svg>
              <div className="bg-[#111] text-white text-[10px] font-bold px-2 py-1 rounded ml-4 mt-1 shadow-sm whitespace-nowrap">
                Sarah (Design)
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* 3. Trusted By Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center w-full max-w-[1200px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2">The tech powering our high-performance solutions</h3>
        <p className="text-neutral-500 text-sm md:text-base mb-10 max-w-[600px] mx-auto">We utilize a modern startup tech stack to ensure your project is built for scale, speed, and long-term maintainability.</p>

        {/* Logo Grid - Tech Stack Oriented */}
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14 px-4 overflow-hidden">
          <CompanyLogo name="React">
            <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full"><circle cx="0" cy="0" r="2.05" fill="#61dafb" /><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg>
          </CompanyLogo>
          <CompanyLogo name="Tailwind">
            <svg viewBox="0 0 24 24" className="w-full h-full"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#38bdf8" /></svg>
          </CompanyLogo>
          <CompanyLogo name="Firebase">
            <svg viewBox="0 0 32 32" className="w-full h-full"><path d="M5.922 24.015L4.444 23.491 14.444 3.015l.556 1.111L5.922 24.015z" fill="#FFCA28" /><path d="M26.078 24.015L15.556 3.015l-.556 1.111 9.444 21.111 1.634-1.222z" fill="#FFA000" /><path d="M5.922 24.015l.611 1.222c1.7 3.4 5.9 5.3 9.467 4z" fill="#F57C00" /><path d="M26.078 24.015l.611 1.222c1.7 3.4-1 7.3-4.567 8.3L16 31.8l10.078-7.785z" fill="#FFCA28" /></svg>
          </CompanyLogo>
          <CompanyLogo name="Figma">
            <svg viewBox="0 0 38 57" className="w-full h-full"><path d="M19 28.5c0-5.247-4.253-9.5-9.5-9.5S0 23.253 0 28.5 4.253 38 9.5 38h9.5v-9.5z" fill="#A259FF" /><path d="M0 9.5C0 4.253 4.253 0 9.5 0H19v19H9.5C4.253 19 0 14.747 0 9.5z" fill="#F24E1E" /><path d="M19 0h9.5c5.247 0 9.5 4.253 9.5 9.5S33.747 19 28.5 19H19V0z" fill="#FF7262" /><path d="M19 19h9.5c5.247 0 9.5 4.253 9.5 9.5S33.747 38 28.5 38H19V19z" fill="#1ABCFE" /><path d="M0 47.5C0 42.253 4.253 38 9.5 38H19v9.5c0 5.247-4.505 10.395-10.073 10.395L9.5 57C4.253 57 0 52.747 0 47.5z" fill="#0ACF83" /></svg>
          </CompanyLogo>
          <CompanyLogo name="Node.js">
            <svg viewBox="0 0 256 256" className="w-full h-full"><path d="M128 0L31.1 56v112.1L128 224l96.9-55.9V56L128 0zm-13.8 174.1c-15.1 0-27.3-12.2-27.3-27.3s12.2-27.3 27.3-27.3 27.3 12.2 27.3 27.3-12.2 27.3-27.3 27.3z" fill="#339933" /></svg>
          </CompanyLogo>
          <CompanyLogo name="Vite">
            <svg viewBox="0 0 256 256" className="w-full h-full"><defs><linearGradient x1="0%" y1="0%" x2="100%" y2="0%" id="a"><stop stopColor="#41D1FF" offset="0%" /><stop stopColor="#BD34FE" offset="100%" /></linearGradient><linearGradient x1="0%" y1="0%" x2="100%" y2="0%" id="b"><stop stopColor="#FFEA83" offset="8.33%" /><stop stopColor="#FFDD35" offset="50%" /><stop stopColor="#FFA800" offset="100%" /></linearGradient></defs><path d="M225.812 39.486l-94.752 203.433a7.68 7.68 0 0 1-13.817 0L24.491 39.486a7.68 7.68 0 0 1 10.1-10.435l90.355 43.102a7.68 7.68 0 0 0 6.613 0L215.707 29.05a7.68 7.68 0 0 1 10.105 10.436z" fill="url(#b)" /><path d="M192.174 1.73l-71.16 114.3a7.68 7.68 0 0 1-12.87 0L37.051 1.73A7.68 7.68 0 0 1 43.483-10l44.3 18.01a7.68 7.68 0 0 0 6.13 0l44.3-18.01A7.68 7.68 0 0 1 192.174 1.73z" fill="url(#a)" /></svg>
          </CompanyLogo>
        </div>

        <div className="mt-8">
          <a href="#testimonials" className="text-sm font-bold text-[#E02424] hover:underline flex items-center justify-center gap-1 group">
            Read customer stories
            <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
          </a>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
