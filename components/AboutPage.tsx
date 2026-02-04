
import React from 'react';
import { motion } from 'framer-motion';
import InternalPageLayout from './InternalPageLayout';
import Footer from './Footer';

const AboutPage: React.FC = () => {
  return (
    <InternalPageLayout>
      <section className="pt-48 pb-32 px-[clamp(24px,5vw,64px)]">
        <div className="max-w-[1200px] mx-auto">
          {/* Hero */}
          <div className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[#E02424]" />
              <span className="text-white/40 text-[12px] font-medium tracking-[0.2em] uppercase">
                {'{01}'} — About Company
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="headline-text font-medium tracking-tightest leading-[1.05] mb-12"
            >
              We design digital experiences that don’t just look good<span className="text-[#E02424]">.</span> They work.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[clamp(1.1rem,2vw,1.6rem)] text-white/40 max-w-[700px] leading-relaxed"
            >
              Rostra is a premium digital agency specializing in high-performance web products. We bridge the gap between bold creativity and technical excellence.
            </motion.p>
          </div>

          {/* Our DNA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-48">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[32px] md:text-[40px] font-medium tracking-tightest leading-tight mb-8">
                Our mission is simple: to make the web more intentional<span className="text-[#E02424]">.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-6 text-white/40 text-lg leading-relaxed"
            >
              <p>
                In an era of noise and generic templates, we focus on the details that matter. We believe that every interaction should have a purpose, every animation should feel natural, and every brand should have a voice.
              </p>
              <p>
                Founded in 2024, Rostra was built to support visionaries who are bored with the status quo and hungry for digital products that actually define their market.
              </p>
            </motion.div>
          </div>

          {/* Principles */}
          <div className="mb-48">
            <h2 className="text-[#E02424] text-[11px] font-bold uppercase tracking-[0.3em] mb-16">Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Precision", desc: "We don't do 'good enough'. We measure twice and cut once, ensuring every pixel is aligned with your goals." },
                { title: "Performance", desc: "Speed is a feature. We build lightweight, blazing-fast sites that keep your users engaged and search engines happy." },
                { title: "Partnership", desc: "We don't work for you; we work with you. Your success is the only metric that truly defines ours." }
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <h3 className="text-2xl font-medium mb-4">{p.title}</h3>
                  <p className="text-white/40 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </InternalPageLayout>
  );
};

export default AboutPage;
