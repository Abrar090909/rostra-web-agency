
import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard: React.FC<{
  title: string;
  category: string;
  date: string;
  service: string;
  image: string;
  delay: number;
  size: 'large' | 'small'
}> = ({ title, category, date, service, image, delay, size }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    whileHover={{ y: -6 }}
    className={`group relative flex flex-col bg-[rgb(28,28,28)] rounded-[20px] p-[28px] cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-all duration-300 overflow-hidden ${size === 'large' ? 'md:h-[420px]' : 'md:h-[320px]'
      }`}
  >
    {/* Meta Row */}
    <div className="flex items-center gap-3 mb-4 shrink-0">
      <div className="text-[13px] font-medium">
        <span className="text-[#ff3b3b] font-bold">{'{ '}</span>
        <span className="text-white/75">{category}</span>
        <span className="text-[#ff3b3b] font-bold">{' }'}</span>
      </div>
      <span className="text-[#9a9a9a] text-[13px] font-normal">{date}</span>
    </div>

    {/* Project Titles */}
    <div className="shrink-0">
      <h3 className="text-[24px] font-medium text-white leading-tight mb-1.5">
        {title}
      </h3>
      <p className="text-[14px] text-[#b0b0b0] font-normal mb-5">
        {service}
      </p>
    </div>

    {/* Project Image - Contained Inside Card */}
    <div className="relative w-full flex-grow overflow-hidden rounded-[14px] bg-[rgb(17,17,17)]">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
      />
    </div>
  </motion.div>
);

const ViewAllTile: React.FC<{ size: 'large' | 'small' }> = ({ size }) => (
  <motion.div
    onClick={() => window.location.hash = '#projects'}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
    whileHover={{ scale: 1.03 }}
    className={`${size === 'large' ? 'md:h-[420px]' : 'md:h-[320px]'} bg-[#e02626] rounded-[20px] flex items-center justify-center p-8 cursor-pointer group transition-transform duration-[0.25s] ease-[cubic-bezier(0.4,0,0.2,1)]`}
  >
    <div className="flex items-center gap-6">
      <span className="text-[18px] font-medium text-white">View all projects</span>
      <div className="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center transition-transform duration-[0.25s] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-[4px]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-[#e02626]"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
    </div>
  </motion.div>
);

const Projects: React.FC = () => {
  return (
    <section id="projects" className="bg-[rgb(17,17,17)] text-white pt-[96px] pb-[120px] relative z-20">
      <div className="max-w-[1200px] mx-auto px-[48px]">
        {/* Header - Moved to the right */}
        <div className="mb-20 text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <span className="text-[#E02424] text-[12px] uppercase tracking-[0.3em] font-bold">
              {'{01}'} — Portfolio
            </span>
            <h2 className="text-[clamp(48px,8vw,72px)] font-medium tracking-tightest leading-none text-white mb-6">
              Selected Work
            </h2>
          </motion.div>
        </div>

        {/* ROW 1: 3 BOXES (FIXED GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1.5fr] gap-[32px] md:h-[420px]">
          <ProjectCard
            title="OLYMP Olive Oil"
            category="Agriculture"
            date="6/20/24"
            service="Website Design"
            image="https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?q=80&w=800&auto=format&fit=crop"
            delay={0.1}
            size="large"
          />
          <ProjectCard
            title="Les Snoros"
            category="Food"
            date="7/13/24"
            service="Web design & Web development"
            image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop"
            delay={0.2}
            size="large"
          />
          <ProjectCard
            title="Glow Rituals"
            category="Beauty & Wellness"
            date="10/12/24"
            service="Digital Brand Experience"
            image="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop"
            delay={0.3}
            size="large"
          />
        </div>

        {/* ROW 2: 3 BOXES (FIXED GRID ALIGNED WITH ROW 1) */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1.5fr] gap-[32px] md:h-[320px] mt-[32px]">
          <ProjectCard
            title="Gym World"
            category="Fitness"
            date="5/31/24"
            service="E-commerce Experience"
            image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
            delay={0.4}
            size="small"
          />
          <ProjectCard
            title="Essense Restaurant"
            category="Hospitality"
            date="8/8/24"
            service="Web design & Web development"
            image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
            delay={0.5}
            size="small"
          />
          <ViewAllTile size="small" />
        </div>
      </div>
    </section>
  );
};

export default Projects;
