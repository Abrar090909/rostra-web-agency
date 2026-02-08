import React from 'react';
import { motion } from 'framer-motion';
import InternalPageLayout from './InternalPageLayout';
import Footer from './Footer';

const ServiceDetailItem: React.FC<{ title: string; index: number }> = ({ title, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex items-center gap-4 py-4 border-b border-white/5"
    >
        <span className="text-[#E02424] font-mono text-sm tracking-tighter">/{(index + 1).toString().padStart(2, '0')}</span>
        <span className="text-xl md:text-2xl font-medium text-white/80">{title}</span>
    </motion.div>
);

const BrandingCreativePage: React.FC = () => {
    const list = [
        "Logo Design",
        "Brand Identity & Guidelines",
        "Social Media Creatives",
        "Ad Creatives & Banners",
        "Video Editing / Motion Graphics",
        "Copywriting"
    ];

    return (
        <InternalPageLayout>
            <div className="max-w-[1200px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <span className="text-[#E02424] text-[12px] uppercase tracking-[0.3em] font-bold block mb-4">Service — 02</span>
                    <h1 className="text-[clamp(40px,7vw,100px)] font-bold tracking-tightest leading-none text-white mb-8">
                        Branding & <span className="text-white/20">Creative</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/40 max-w-[700px] leading-relaxed">
                        Creative design solutions including logo design and brand identity that build a strong and memorable brand presence.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="w-full aspect-[21/9] rounded-[40px] overflow-hidden mb-20 border border-white/5"
                >
                    <img
                        src="/images/services/branding.png"
                        alt="Branding & Creative"
                        className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-[2s]"
                    />
                </motion.div>

                <div className="grid lg:grid-cols-[1fr_400px] gap-20">
                    <div className="flex flex-col">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E02424] mb-8">Services:</h2>
                        <div className="flex flex-col">
                            {list.map((item, i) => (
                                <ServiceDetailItem key={item} title={item} index={i} />
                            ))}
                        </div>
                    </div>

                    <div className="bg-[rgb(17,17,17)] rounded-[32px] p-10 border border-white/5 h-fit sticky top-32">
                        <h3 className="text-2xl font-bold text-white mb-4">Position your agency</h3>
                        <p className="text-white/40 mb-8 leading-relaxed">
                            We help you stand out as a premium brand through consistent, high-end visual storytelling.
                        </p>
                        <a href="#contact" className="inline-flex items-center justify-center w-full py-4 bg-[#E02424] text-white rounded-2xl font-bold uppercase text-[12px] tracking-widest hover:bg-[#c51f1f] transition-colors">
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </InternalPageLayout>
    );
};

export default BrandingCreativePage;
