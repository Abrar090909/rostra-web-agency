
import React from 'react';
import { motion } from 'framer-motion';
import InternalPageLayout from './InternalPageLayout';
import Footer from './Footer';

const projects = [
  { title: "OLYMP Olive Oil", category: "Agriculture", service: "Website Design", year: "2024", image: "https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?q=80&w=800&auto=format&fit=crop" },
  { title: "Les Snoros", category: "Food", service: "Web Development", year: "2024", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
  { title: "Glow Rituals", category: "Beauty", service: "Brand Identity", year: "2024", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop" },
  { title: "Gym World", category: "Fitness", service: "E-commerce", year: "2024", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop" },
  { title: "Essense Restaurant", category: "Hospitality", service: "Full Stack", year: "2023", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop" },
  { title: "Vortex SaaS", category: "Technology", service: "Dashboard Design", year: "2023", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
];

const ProjectsPage: React.FC = () => {
  return (
    <InternalPageLayout>
      <section className="pt-48 pb-32 px-[clamp(24px,5vw,64px)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-24">
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[#E02424]" />
              <span className="text-white/40 text-[12px] font-medium tracking-[0.2em] uppercase">
                {'{02}'} — Portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="headline-text font-medium tracking-tightest leading-none mb-8"
            >
              Selected Work
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-[24px] bg-[rgb(28,28,28)] mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-medium mb-1">{project.title}</h3>
                    <p className="text-white/30 text-sm uppercase tracking-widest">{project.category} — {project.service}</p>
                  </div>
                  <span className="text-white/20 font-mono text-xs">{project.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </InternalPageLayout>
  );
};

export default ProjectsPage;
