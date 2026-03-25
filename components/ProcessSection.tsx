
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
      className="grid grid-cols-1 lg:grid-cols-[160px_1fr_160px] gap-8 py-12 border-b border-white/5 last:border-0"
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
      name: "Strategy",
      number: "/01",
      title: "We align on what you’re building — and how it drives real growth",
      bullets: [
        "Understand your business goals, product vision, and target audience",
        "Identify high-impact problems and conversion opportunities",
        "Define clear scope, priorities, success metrics, and roadmap"
      ],
      timeline: "1–2 days"
    },
    {
      name: "Design",
      number: "/02",
      title: "We design structure, flow, and visuals with intent",
      bullets: [
        "Create wireframes focused on user journey and conversion flow",
        "Develop a consistent, scalable visual identity",
        "Build interactive prototypes to validate direction early"
      ],
      timeline: "2–3 days"
    },
    {
      name: "Development",
      number: "/03",
      title: "We build fast, scalable, and performance-ready digital systems",
      bullets: [
        "Develop clean, scalable code using modern best practices",
        "Integrate content, assets, interactions, and animations",
        "Optimize for responsiveness, speed, accessibility, and SEO"
      ],
      timeline: "~5 days"
    },
    {
      name: "Launch",
      number: "/04",
      title: "We test, refine, and launch with confidence",
      bullets: [
        "Test across devices, browsers, and screen sizes",
        "Fix edge cases, polish details, and ensure stability",
        "Deploy, go live, and support a smooth launch"
      ],
      timeline: "~7 days"
    }
  ];

  return (
    <section id="process" className="relative bg-[rgb(17,17,17)] text-white z-40 overflow-hidden pb-8 md:pb-12">
      {/* 1. Moving Category Strip (Top) - Exactly matching StatsAndIntro styling */}
      <div className="w-full h-[56px] md:h-[72px] bg-[rgb(28,28,28)] border-y border-white/5 relative overflow-hidden flex items-center mb-12">
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

      <div className="max-w-[1200px] mx-auto px-6 md:px-[48px]">
        {/* Header Block */}
        <div className="mb-12">
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
              Our Approach
            </h2>
          </motion.div>
        </div>

        {/* Steps List */}
        <div className="flex flex-col mb-16">
          {processSteps.map((step, i) => (
            <Step key={step.name} {...step} index={i} />
          ))}
        </div>

        {/* Closing Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-[18px] md:text-[24px] text-white font-medium leading-relaxed max-w-[800px] mx-auto">
            Every step is designed to keep your brand perfectly positioned for performance — <span className="text-[#E02424]">from strategy to scale.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
