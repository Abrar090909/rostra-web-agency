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

const AdvertisingPerformancePage: React.FC = () => {
    const list = [
        "Google Ads (Search, Display, YouTube)",
        "Meta Ads (Facebook & Instagram)",
        "LinkedIn Ads",
        "PPC Campaign Management",
        "Conversion Rate Optimization (CRO)",
        "Retargeting Campaigns"
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
                    <span className="text-[#E02424] text-[12px] uppercase tracking-[0.3em] font-bold block mb-4">Service — 05</span>
                    <h1 className="text-[clamp(40px,7vw,100px)] font-bold tracking-tightest leading-none text-white mb-8">
                        Ad / <span className="text-white/20">Performance</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/40 max-w-[700px] leading-relaxed">
                        Result-oriented paid advertising campaigns across major platforms focused on traffic, leads, and measurable ROI.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="w-full aspect-[21/9] rounded-[40px] overflow-hidden mb-20 border border-white/5"
                >
                    <img
                        src="/images/services/ads.png"
                        alt="Advertising & Performance"
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
                        <h3 className="text-2xl font-bold text-white mb-4">Result oriented</h3>
                        <p className="text-white/40 mb-8 leading-relaxed">
                            We make every dollar count, optimizing your ad spend for maximum conversion and premium positioning.
                        </p>
                        <a href="#contact" className="inline-flex items-center justify-center w-full py-4 bg-[#E02424] text-white rounded-2xl font-bold uppercase text-[12px] tracking-widest hover:bg-[#c51f1f] transition-colors">
                            Talk to Specialist
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </InternalPageLayout>
    );
};

export default AdvertisingPerformancePage;
