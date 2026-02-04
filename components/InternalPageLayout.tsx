
import React from 'react';
import { motion } from 'framer-motion';

interface InternalPageLayoutProps {
  children: React.ReactNode;
}

const InternalPageLayout: React.FC<InternalPageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[rgb(17,17,17)] text-white selection:bg-red-600">
      {/* Back to Home Navigation */}
      <div className="fixed top-8 left-8 md:left-12 z-[100]">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          className="flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-colors group-hover:bg-[#E02424] group-hover:border-[#E02424]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">Back</span>
        </motion.a>
      </div>

      <motion.div
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
