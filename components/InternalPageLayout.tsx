
import React from 'react';
import { motion } from 'framer-motion';

interface InternalPageLayoutProps {
  children: React.ReactNode;
}

const InternalPageLayout: React.FC<InternalPageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[rgb(11,11,11)] text-white selection:bg-red-600">
      <div className="fixed top-28 left-8 md:top-32 md:left-12 z-[2100]">
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -8 }}
          className="flex items-center gap-4 text-white hover:text-[#E02424] transition-all duration-300 group"
        >
          <div className="flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] transition-colors">Home</span>
        </motion.a>
      </div>

      <motion.div
        className="pt-40 md:pt-48 px-8 md:px-24 lg:px-32 pb-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default InternalPageLayout;
