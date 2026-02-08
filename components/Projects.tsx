
import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard: React.FC<{
  title: string;
  category: string;
  service: string;
  image: string;
  delay: number;
  size: 'large' | 'small'
}> = ({ title, category, service, image, delay, size }) => (
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
      <div className="max-w-[1200px] mx-auto px-6 md:px-[48px]">
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

        {/* ROW 1: 2 BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] md:h-[420px]">
          <div onClick={() => window.open('https://pulse8gym.com/', '_blank')} className="contents">
            <ProjectCard
              title="Pulse8 Gym"
              category="Fitness"
              service="Full Brand Website"
              image="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop"
              delay={0.1}
              size="large"
            />
          </div>
          <div onClick={() => window.open('https://florianhurelhaircouture.com/', '_blank')} className="contents">
            <ProjectCard
              title="Florian Hurel"
              category="Beauty & Wellness"
              service="Luxury Brand Experience"
              image="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop"
              delay={0.2}
              size="large"
            />
          </div>
        </div>

        {/* ROW 2: 3 BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.5fr] gap-[32px] md:h-[320px] mt-[32px]">
          <div onClick={() => window.open('https://lagompatisserie.com/', '_blank')} className="contents">
            <ProjectCard
              title="Lagom Patisserie"
              category="Cakes & Bakery"
              service="E-commerce Experience"
              image="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1200&auto=format&fit=crop"
              delay={0.4}
              size="small"
            />
          </div>
          <div onClick={() => window.open('https://www.embarkperfumes.com/', '_blank')} className="contents">
            <ProjectCard
              title="Embark Perfumes"
              category="Lifestyle"
              service="Digital Identity"
              image="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop"
              delay={0.5}
              size="small"
            />
          </div>
          <ViewAllTile size="small" />
        </div>
      </div>
    </section>
  );
};

export default Projects;
