
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

const TestimonialCard: React.FC<{ quote: string; author: string; company: string; rating: string; index: number }> = ({ quote, author, company, rating, index }) => (
  <div className="flex-shrink-0 w-[300px] md:w-[380px] h-[280px] bg-white/[0.03] border border-white/10 rounded-[24px] p-6 flex flex-col justify-between group mx-3">
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-1.5">
        <span className="text-white/40 text-[10px] font-bold tracking-widest">{rating} / 5</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
        </div>
      </div>
      <div className="scale-75 opacity-50">
        <QuoteIcon />
      </div>
    </div>

    <div className="flex-1 flex flex-col justify-center py-4">
      <p className="text-[14px] md:text-[15px] leading-relaxed text-white/70 font-normal italic">
        "{quote}"
      </p>
    </div>

    <div className="mt-2 pt-4 border-t border-white/5">
      <div className="flex items-center gap-2">
        <p className="text-white font-medium text-[13px]">{author}</p>
        <span className="px-2 py-0.5 rounded-full border border-[#E02424]/30 text-[#E02424] text-[8px] font-bold uppercase tracking-tighter bg-[#E02424]/5">
          {company}
        </span>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Rostra helped us build a strong digital presence that truly reflects our brand. The new website and marketing strategy noticeably increased inquiries and walk-ins.",
      author: "Ashwin Sahu",
      company: "Pulse8 Gym",
      rating: "4.7"
    },
    {
      quote: "Rostra created a clean and trustworthy digital experience for our clinic. We saw an increase in patient inquiries soon after the website went live.",
      author: "Dr. Neha Singh",
      company: "D C Z",
      rating: "4.7"
    },
    {
      quote: "Rostra gave our brand a professional online identity that matched the quality of our products. The improved website structure helped boost orders and visibility.",
      author: "Tazeem Kapadia",
      company: "Lagom",
      rating: "4.8"
    },
    {
      quote: "Rostra crafted a stylish and inviting digital presence that perfectly captured our salon's vibe. The new website made it easier for clients to explore our services.",
      author: "Florian Hurel",
      company: "Florian Hurel HairLand",
      rating: "5.0"
    },
    {
      quote: "From branding to execution, Rostra delivered exactly what we needed. Our online presence now feels premium, consistent, and far more engaging for customers.",
      author: "Sananda Basak",
      company: "MAGS",
      rating: "4.9"
    },
    {
      quote: "Rostra transformed our digital presence into something elegant and brand-aligned. The result was better visibility and stronger customer trust.",
      author: "Varsha Dalal",
      company: "Embark Perfumes",
      rating: "4.8"
    }
  ];

  // Double the array for seamless marquee loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative z-30 bg-[rgb(17,17,17)] pt-48 pb-64 -mt-12 overflow-hidden">
      {/* Visual Mask */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-t from-[rgb(17,17,17)] via-[rgb(17,17,17)] to-transparent pointer-events-none" />

      <div className="w-full relative z-10">
        {/* Centered Header Section */}
        <div className="max-w-[1400px] mx-auto text-center mb-16 flex flex-col items-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#E02424]" />
            <span className="text-white/40 text-[11px] font-medium tracking-[0.2em] uppercase">
              {'{04}'} — Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(36px,5vw,72px)] font-medium text-white tracking-tightest leading-[1.1]"
          >
            Don't take our<br />
            word for it<span className="text-[#E02424]">*</span>
          </motion.h2>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative flex overflow-hidden group">
          <motion.div
            animate={{
              x: [0, -1920], // Adjusted for card width * count
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex hover:[animation-play-state:paused]"
          >
            {marqueeItems.map((item, i) => (
              <TestimonialCard key={i} {...item} index={i} />
            ))}
          </motion.div>

          {/* Edge Fades */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[rgb(17,17,17)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[rgb(17,17,17)] to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
