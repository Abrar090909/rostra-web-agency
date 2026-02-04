
import React from 'react';
import { motion } from 'framer-motion';

const Capsule: React.FC<{ children: React.ReactNode, variant?: 'light' | 'red', delay?: number }> = ({ 
  children, 
  variant = 'light', 
  delay = 0 
}) => {
  const isRed = variant === 'red';
  
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      transition={{ 
        delay, 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        y: { duration: 0.25, ease: "easeOut" }
      }}
      className={`
        inline-flex items-center justify-center 
        h-[1.2em] px-[0.4em] rounded-full 
        text-[1em] font-medium leading-none 
        transition-all duration-300 mx-[8px] align-middle select-none
        ${isRed 
          ? 'bg-[#e02424] text-white red-capsule-shadow' 
          : 'bg-white/90 border border-black/[0.06] text-neutral-900 capsule-shadow backdrop-blur-md'}
      `}
    >
      {children}
    </motion.span>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen w-full flex flex-col pt-40 md:pt-56 px-[clamp(24px,5vw,64px)] overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col">
        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span className="text-[10px] md:text-xs font-medium text-neutral-400 uppercase tracking-widest">Available for project</span>
        </motion.div>

        {/* Headline Block - Natural Sentence Flow */}
        <div className="headline-text font-medium tracking-tightest text-neutral-900">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Line 1: Natural Pause */}
            <div className="flex items-center flex-wrap">
              <span>Hi! we’re</span>
              <Capsule delay={0.3}>Rostra</Capsule>
              <span>, a</span>
              <Capsule variant="red" delay={0.4}>digital agency</Capsule>
            </div>
            
            {/* Line 2 */}
            <div className="mt-1">
              <span>crafting bold web experiences</span>
            </div>
            
            {/* Line 3 */}
            <div className="mt-1">
              <span>for modern brands.</span>
            </div>
          </motion.div>
        </div>

        {/* Subtext Paragraph & Placeholder Space */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-10 md:mt-14 max-w-[540px]"
        >
          <p className="text-[clamp(1.1rem,2vw,1.5rem)] text-neutral-400 leading-relaxed font-normal">
            We partner with ambitious startups and established companies to build high-performance digital products that define the next generation of the web.
          </p>

          {/* Reserved space where the button was */}
          <div className="mt-10 h-[52px]" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
