
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MarqueeItem: React.FC = () => (
  <div className="flex items-center gap-[24px] px-[12px] h-full whitespace-nowrap">
    <span className="text-[#E02424] font-medium text-[15px] md:text-[18px] tracking-[0.02em]">2+ YEARS OF DELIVERY</span>
    <span className="text-[#E5E5E5] text-lg">✳</span>
    <span className="text-[#E02424] font-medium text-[15px] md:text-[18px] tracking-[0.02em]">TRUSTED BY PARTNERS</span>
    <span className="text-[#E5E5E5] text-lg">✳</span>
  </div>
);

const StatsAndIntro: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-[rgb(17,17,17)] text-white overflow-hidden">
      {/* 1. Moving Metrics Strip (Marquee) */}
      <div className="w-full h-[56px] md:h-[72px] bg-[rgb(28,28,28)] border-y border-white/5 relative overflow-hidden flex items-center">
        <motion.div
          className="flex"
          animate={{ x: [-1000, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          <div className="flex shrink-0">
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </motion.div>
      </div>

      {/* 2. Main Text Block & Inline CTA */}
      <div className="max-w-[1200px] mx-auto px-[clamp(24px,5vw,64px)] pt-[96px] pb-[96px]">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
          {/* Text Content */}
          <div className="max-w-[840px]">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[38px] md:text-[54px] font-medium leading-[1.25] tracking-tightest"
            >
              <span className="text-white/45 block">we design systems that</span>
              <span className="text-white">feel intentional, perform flawlessly,</span>
              <span className="text-white/45 block">and scale with you</span>
            </motion.h2>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.1; }
        }
      `}</style>
    </section>
  );
};

export default StatsAndIntro;
