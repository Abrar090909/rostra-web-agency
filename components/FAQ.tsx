
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  index: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ index, question, answer, isOpen, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-4"
    >
      <div
        onClick={onClick}
        className={`group cursor-pointer bg-white border border-neutral-100 rounded-[20px] p-6 md:p-8 transition-all duration-300 ${
          isOpen ? 'shadow-lg shadow-neutral-100/50 border-neutral-200' : 'hover:border-neutral-200 hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="text-neutral-300 font-light text-sm tracking-widest min-w-[24px]">
              {index}
            </span>
            <h3 className={`text-lg md:text-xl font-medium tracking-tight transition-colors duration-300 ${
              isOpen ? 'text-neutral-900' : 'text-neutral-800 group-hover:text-neutral-900'
            }`}>
              {question}
            </h3>
          </div>
          
          <div className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'border-[#E02424] bg-[#E02424] text-white rotate-45' 
              : 'border-neutral-200 text-neutral-400 group-hover:border-[#E02424] group-hover:text-[#E02424]'
          }`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pl-12 md:pl-12 pr-4">
                <p className="text-neutral-500 leading-relaxed text-[15px] md:text-base">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does a typical project usually take?",
      answer: "While every project is unique, a standard corporate website typically spans 3–5 weeks from discovery to launch. We focus on quality and precision, ensuring the timeline allows for thorough testing and refinement without unnecessary delays."
    },
    {
      question: "Do you provide long-term support after launch?",
      answer: "Absolutely. We view our relationships with clients as partnerships. After launch, we offer flexible support plans for maintenance, performance monitoring, and iterative updates to ensure your digital product remains competitive and efficient."
    },
    {
      question: "Can you adapt to an existing brand or design system?",
      answer: "Yes, we frequently collaborate with established brands. Whether you have a strict design system or just a loose brand guide, we adapt our process to integrate seamlessly with your current visual identity while bringing fresh, high-performance execution to the table."
    },
    {
      question: "How do revisions and feedback cycles work?",
      answer: "We work in structured cycles to maintain momentum. Typically, each phase includes dedicated feedback windows where we review progress together. We ensure you are heard at every step, making adjustments efficiently to keep the project on track and aligned with your goals."
    }
  ];

  return (
    <section id="faq" className="relative z-40 bg-white py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-8">
        {/* Header Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#E02424]" />
          <span className="text-neutral-400 text-[11px] font-medium tracking-[0.25em] uppercase">
            [05] — FAQ
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-[clamp(40px,5vw,64px)] font-medium text-neutral-900 tracking-tightest leading-tight mb-24"
        >
          Got any questions?
        </motion.h2>

        {/* FAQ Accordion */}
        <div className="relative">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              index={(i + 1).toString().padStart(2, '0')}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
