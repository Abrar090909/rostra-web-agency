
import React from 'react';
import { motion } from 'framer-motion';

const StarIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[#E02424]">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
  </svg>
);

const QuoteIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-white/10">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.34315 11.3601 6 13.017 6H19.017C20.6739 6 22.017 7.34315 22.017 9V15C22.017 17.7614 19.7784 20 17.017 20H14.017V21ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56929 13 4.017 13H2.017C1.46472 13 1.017 12.5523 1.017 12V9C1.017 7.34315 2.36015 6 4.017 6H10.017C11.6739 6 13.017 7.34315 13.017 9V15C13.017 17.7614 10.7784 20 8.017 20H5.017V21Z" />
  </svg>
);

const TestimonialCard: React.FC<{ quote: string; index: number }> = ({ quote, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    className="relative flex flex-col bg-white/[0.03] border border-white/10 rounded-[24px] p-8 md:p-10 min-h-[320px] justify-between group"
  >
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-2">
        <span className="text-white/40 text-[11px] font-bold tracking-widest">5.0 / 5</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
        </div>
      </div>
      <QuoteIcon />
    </div>
    <p className="text-[17px] md:text-[19px] leading-relaxed text-white/80 font-normal">
      {quote}
    </p>
  </motion.div>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    "Their design thinking is top-notch. Every element on our site now feels intentional and elegant. Clients always compliment the UI!",
    "Rostra understood our brand in ways we hadn't even imagined. The UI is sleek, fast, and makes our app stand out in a crowded market.",
    "From wireframes to final build, the Rostra team was insanely detail-oriented. Our bounce rate dropped by 42% after the redesign!",
    "They gave us more than just a website — they gave us a digital identity. The site is incredibly responsive and the aesthetics are on point!"
  ];

  return (
    <section className="relative z-30 bg-[rgb(17,17,17)] pt-48 pb-64 -mt-12">
      {/* Visual Mask: Pulling the section up slightly to hide card bottoms from the CardSwap above */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-t from-[rgb(17,17,17)] via-[rgb(17,17,17)] to-transparent pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-[48px] relative z-10">
        {/* Centered Header Section */}
        <div className="text-center mb-24 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-[#E02424]" />
            <span className="text-white/40 text-[12px] font-medium tracking-[0.2em] uppercase">
              {'{04}'} — Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(44px,7vw,96px)] font-medium text-white tracking-tightest leading-[1.05] mb-8"
          >
            Don't take our<br />
            word for it<span className="text-[#E02424]">*</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="text-[#E02424] text-lg">*</span>
            <span className="text-[#E02424] text-[13px] font-bold uppercase tracking-[0.2em] cursor-pointer hover:opacity-80 transition-opacity">
              Take theirs
            </span>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((quote, i) => (
            <TestimonialCard key={i} quote={quote} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
