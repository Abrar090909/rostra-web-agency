
import React from 'react';
import { motion } from 'framer-motion';
import Folder from './Folder';

// Component to showcase the agency's tool stack using the Folder component
const ToolsSection: React.FC = () => {
  // Logos provided in the prompt
  const tools = [
    // VS Code Logo
    <img
      key="vscode"
      src="https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-icon.svg"
      alt="VS Code"
      className="w-10 h-10 object-contain"
    />,
    // Figma Logo (using a more reliable vector logo CDN)
    <img
      key="figma"
      src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg"
      alt="Figma"
      className="w-10 h-10 object-contain"
    />,
    // Sparkle Gradient Logo
    <div key="sparkle" className="flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-sm">
        <defs>
          <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B61FF" />
            <stop offset="100%" stopColor="#00C2FF" />
          </linearGradient>
        </defs>
        <path
          d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0"
          fill="url(#sparkleGrad)"
        />
      </svg>
    </div>
  ];

  return (
    <section className="relative min-h-[900px] bg-white flex flex-col items-center justify-center py-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-50/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Section Header */}
      <div className="relative z-10 text-center mb-24 max-w-[900px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 items-center"
        >
          <span className="text-[#E02424] text-[12px] uppercase tracking-[0.3em] font-bold">
            {'{02}'} — Technology Stack
          </span>
          <h2 className="text-[clamp(48px,8vw,72px)] font-medium tracking-tightest leading-none text-neutral-900 mb-8">
            The ecosystem we use to build the future
          </h2>
        </motion.div>
        <p className="text-neutral-500 text-lg">
          We leverage industry-leading tools and custom-built frameworks to ensure every project is fast, scalable, and delightful to use.
        </p>
      </div>

      {/* Interactive Folder Stack */}
      <div className="relative z-20 flex items-center justify-center">
        <Folder items={tools} />
      </div>
    </section>
  );
};

export default ToolsSection;
