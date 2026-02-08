
import React from 'react';
import { motion } from 'framer-motion';
import InternalPageLayout from './InternalPageLayout';
import Footer from './Footer';

const projects = [
  { title: "Pulse8 Gym", category: "Fitness", service: "Full Brand Website", image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop", url: "https://pulse8gym.com/" },
  { title: "Florian Hurel", category: "Beauty & Wellness", service: "Luxury Brand Experience", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop", url: "https://florianhurelhaircouture.com/" },
  { title: "Lagom Patisserie", category: "Cakes & Bakery", service: "E-commerce Experience", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1200&auto=format&fit=crop", url: "https://lagompatisserie.com/" },
  { title: "Embark Perfumes", category: "Lifestyle", service: "Digital Identity", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop", url: "https://www.embarkperfumes.com/" },
];

const ProjectsPage: React.FC = () => {
  return (
    <InternalPageLayout>
      <section>
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
                onClick={() => (project as any).url && window.open((project as any).url, '_blank')}
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
