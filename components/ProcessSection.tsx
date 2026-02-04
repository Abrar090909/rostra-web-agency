
import React from 'react';
import { motion } from 'framer-motion';

const MarqueeItem: React.FC = () => (
  <div className="flex items-center gap-[24px] px-[12px] h-full whitespace-nowrap">
    <span className="text-[#E02424] font-medium text-[15px] md:text-[18px] tracking-[0.02em]">E-commerce</span>
    <span className="text-[#E5E5E5] text-lg">✳︎</span>
    <span className="text-[#E02424] font-medium text-[15px] md:text-[18px] tracking-[0.02em]">Corporate website</span>
    <span className="text-[#E5E5E5] text-lg">✳︎</span>
    <span className="text-[#E02424] font-medium text-[15px] md:text-[18px] tracking-[0.02em]">Landing page</span>
    <span className="text-[#E5E5E5] text-lg">✳︎</span>
    <span className="text-[#E02424] font-medium text-[15px] md:text-[18px] tracking-[0.02em]">Blog</span>
    <span className="text-[#E5E5E5] text-lg">✳︎</span>
  </div>
);

const Step: React.FC<{
  name: string;
  number: string;
  title: string;
  bullets: string[];
  timeline: string;
  index: number;
}> = ({ name, number, title, bullets, timeline, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-[160px_1fr_160px] gap-8 py-16 border-b border-white/5 last:border-0"
    >
      {/* Left: Step Pill */}
      <div className="flex items-start">
        <span className="inline-block border border-white/10 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
          {name}
        </span>
      </div>

      {/* Center: Content */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-4 mb-6">
          <span className="text-[#E02424] font-medium text-[20px] md:text-[24px] font-mono tracking-tighter">
            {number}
          </span>
          <h3 className="text-[22px] md:text-[30px] font-medium leading-tight text-white tracking-tight">
            {title}
          </h3>
        </div>

        <ul className="space-y-4">
          {bullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
              className="flex items-start gap-4 text-[15px] md:text-[16px] text-white/40 leading-relaxed"
            >
              <span className="text-[#E02424] mt-1.5 select-none text-[10px]">✳</span>
              <span>{bullet}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Right: Timeline */}
      <div className="lg:text-right flex items-start lg:justify-end">
        <span className="text-[13px] font-medium text-white/30 flex items-center gap-2 tracking-wide uppercase whitespace-nowrap">
          <span className="text-white/10">⏱</span> {timeline}
        </span>
      </div>
    </motion.div>
  );
};

const ProcessSection: React.FC = () => {
  const processSteps = [
    {
      name: "Discovery",
      number: "/01",
      title: "We align on what you’re trying to build — and why it matters",
      bullets: [
        "Understand your idea, product, or goal",
        "Identify the real problem worth solving",
        "Define scope, priorities, and success criteria"
      ],
      timeline: "1–2 days"
    },
    {
      name: "Design",
      number: "/02",
      title: "We shape the structure and visual direction",
      bullets: [
        "Create wireframes to define layout and flow",
        "Establish a consistent visual language",
        "Build interactive prototypes for early feedback"
      ],
      timeline: "2–3 days"
    },
    {
      name: "Build",
      number: "/03",
      title: "We turn designs into a working product",
      bullets: [
        "Implement the site with clean, scalable structure",
        "Integrate content, assets, and interactions",
        "Ensure responsiveness, performance, and basic SEO"
      ],
      timeline: "~5 days"
    },
    {
      name: "Launch",
      number: "/04",
      title: "We ship, test, and make sure everything works as intended",
      bullets: [
        "Test across devices and browsers",
        "Fix edge cases and polish details",
        "Deploy and go live with confidence"
      ],
      timeline: "~7 days"
    }
  ];

  return (
    <section className="relative bg-[rgb(17,17,17)] text-white z-40 overflow-hidden pb-16">
      {/* 1. Moving Category Strip (Top) - Exactly matching StatsAndIntro styling */}
      <div className="w-full h-[56px] md:h-[72px] bg-[rgb(28,28,28)] border-y border-white/5 relative overflow-hidden flex items-center mb-24">
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

      <div className="max-w-[1200px] mx-auto px-[48px]">
        {/* Header Block */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <span className="text-[#E02424] text-[12px] uppercase tracking-[0.3em] font-bold">
              {'{03}'} — Process
            </span>
            <h2 className="text-[clamp(48px,8vw,72px)] font-medium tracking-tightest leading-none text-white mb-6">
              How it works
            </h2>
          </motion.div>
        </div>

        {/* Steps List */}
        <div className="flex flex-col">
          {processSteps.map((step, i) => (
            <Step key={step.name} {...step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
