import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

const TextReveal: React.FC<TextRevealProps> = ({ text, className = "", wordClassName = "" }) => {
  const targetRef = useRef<HTMLHeadingElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.9", "center 0.6"]
  });

  const words = text.split(" ");

  return (
    <div ref={targetRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        const color = useTransform(scrollYProgress, [start, end], ["rgba(255,255,255,0.15)", "rgba(255,255,255,1)"]);
        return (
          <motion.span 
            key={i} 
            style={{ color }} 
            className={`mr-[0.3em] ${wordClassName}`}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
};

export default TextReveal;
