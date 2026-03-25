
import React from 'react';
import { motion } from 'framer-motion';
import InternalPageLayout from './InternalPageLayout';
import Footer from './Footer';

const AboutPage: React.FC = () => {
  return (
    <InternalPageLayout>
      <section>
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
                {'{01}'} — About Rostra
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="headline-text font-medium tracking-tightest leading-[1.05] mb-12"
            >
              Digital experiences built to perform, convert, and scale<span className="text-[#E02424]">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-white/60 leading-relaxed"
            >
              <div className="flex flex-col gap-6">
                <p>
                  Rostra is a performance-driven digital agency helping brands build high-impact websites and digital systems that do more than just exist online — they drive visibility, engagement, and measurable growth.
                </p>
                <p>
                  We combine strategic thinking, bold creative execution, and technical excellence to create digital experiences that work as hard as your business does.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <p>
                  We don’t believe in vanity metrics or surface-level design. Everything we build is engineered to deliver real business outcomes.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Mission & Vision */}
          <div className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="border-l-2 border-[#E02424] pl-8 py-2 mb-16"
            >
              <h2 className="text-[28px] md:text-[36px] font-medium tracking-tight leading-tight text-white mb-4">
                Our mission is simple: make the web intentional.
              </h2>
              <p className="text-white/60 text-lg max-w-[800px]">
                In a world full of generic templates and rushed builds, we focus on clarity, purpose, and performance. Every interaction is designed with intent. Every visual choice supports usability. Every digital touchpoint is aligned with your growth goals.
              </p>
            </motion.div>
          </div>

          {/* Proof-First Approach */}
          <div className="mb-32 bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[#E02424] text-[11px] font-bold uppercase tracking-[0.3em] block mb-6">Our Philosophy</span>
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">What truly sets Rostra apart is our proof-first approach.</h3>
                <div className="space-y-6 text-white/60 text-lg leading-relaxed">
                  <p>
                    We don’t ask clients to blindly trust promises or upfront commitments. Instead, we demonstrate value first — through strategy, direction, and initial execution. Once you see the quality, intent, and impact of our work, we move forward together.
                  </p>
                  <p className="text-white font-medium border-b border-[#E02424] inline-block pb-1">
                    Because confidence is built on results, not invoices.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-[#E02424] blur-[100px] opacity-10 rounded-full"></div>
                <div className="relative z-10 space-y-6 text-white/60 text-lg leading-relaxed">
                  <p>
                    Founded in 2024, Rostra was created for founders, startups, and growing businesses who are done with agencies that overpromise and underdeliver. We work with teams who want a long-term digital partner, not just another vendor — someone who understands their vision and is invested in their success.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Principles */}
          <div className="mb-48">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <h2 className="text-[#E02424] text-[11px] font-bold uppercase tracking-[0.3em]">Our Principles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Precision",
                  desc: "We don’t do “good enough.” From strategy to pixels to performance, every detail is thoughtfully crafted to align with your business objectives and audience expectations."
                },
                {
                  title: "Performance",
                  desc: "Speed, scalability, and SEO are not add-ons — they’re fundamentals. We build fast-loading, search-optimized, and conversion-ready digital systems that grow with your business."
                },
                {
                  title: "Partnership",
                  desc: "We believe in earning trust, not demanding it. That’s why we lead with value, collaborate closely, and move forward only when you’re confident in what we bring to the table."
                }
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 hover:border-[#E02424]/30 transition-colors group"
                >
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[#E02424] transition-colors">{p.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing Trust Line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-[800px] mx-auto mb-24"
          >
            <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
              If you’re looking for a digital agency that proves its value before asking for your investment, <span className="text-[#E02424]">you’re in the right place.</span>
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </InternalPageLayout>
  );
};

export default AboutPage;
