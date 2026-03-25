import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceCard: React.FC<{
    index: number;
    title: string;
    description: string;
    href: string;
    isOpen: boolean;
    onToggle: () => void;
    isFullWidth?: boolean;
}> = ({ index, title, description, href, isOpen, onToggle, isFullWidth = false }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={onToggle}
            className={`
        relative overflow-hidden rounded-[24px] border cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group
        ${isOpen
                    ? 'bg-neutral-50 border-[#E02424] shadow-lg shadow-red-500/5'
                    : 'bg-white border-neutral-200 hover:border-[#E02424]/50 hover:shadow-md'
                }
        ${isFullWidth ? 'md:col-span-2' : ''}
      `}
        >
            <div className="p-8 md:p-10">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-4">
                        <span className={`font-mono text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${isOpen ? 'text-[#E02424]' : 'text-neutral-400'}`}>
                            {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <h3 className={`text-2xl md:text-3xl font-medium tracking-tight transition-colors duration-300 ${isOpen ? 'text-neutral-900' : 'text-neutral-900'}`}>
                            {title}
                        </h3>
                    </div>

                    <div className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen
                        ? 'bg-[#E02424] border-[#E02424] text-white rotate-180'
                        : 'border-neutral-200 text-neutral-400 group-hover:border-[#E02424] group-hover:text-[#E02424]'
                        }`}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 5L7 10L12 5" />
                        </svg>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <p className="text-lg text-neutral-600 leading-relaxed max-w-[90%]">
                                {description}
                            </p>

                            <a
                                href={href}
                                onClick={(e) => e.stopPropagation()}
                                className="mt-8 inline-flex items-center gap-2 text-[#E02424] font-bold text-sm uppercase tracking-wider hover:translate-x-1 transition-transform"
                            >
                                <span>Explore service</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const ServicesSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const services = [
        {
            title: "Website Development",
            description: "We build fast, conversion-ready websites across WordPress, Shopify, and Custom builds. From brand websites to high-impact landing pages, every site is designed for performance, responsiveness, and SEO readiness. Pay only after the work is done.",
            href: "#service-web-dev"
        },
        {
            title: "Branding & Creative Services",
            description: "We craft brand identities that feel clear, confident, and instantly recognizable. From logos and visual systems to social media creatives, we design brands that stand out, stay consistent, and build trust across every digital touchpoint.",
            href: "#service-branding"
        },
        {
            title: "Lead Generation",
            description: "We design demand systems, not just campaigns. Using targeted funnels, optimized landing experiences, and smart messaging, we help you attract the right audience, capture intent, and convert attention into qualified business leads.",
            href: "#service-lead-gen"
        },
        {
            title: "Digital Marketing",
            description: "We grow your digital presence with strategy-first marketing — combining SEO, content, social media, and email into one cohesive growth engine. The goal isn’t noise or vanity metrics, it’s visibility that compounds and engagement that converts.",
            href: "#service-digital-marketing"
        },
        {
            title: "Advertising / Performance Marketing",
            description: "We run performance-driven ad campaigns across Google, Meta, and high-intent platforms — optimized for conversions, not just clicks. Every campaign is tracked, tested, and scaled with a clear focus on ROI and business outcomes.",
            href: "#service-ads"
        }
    ];

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="services" className="bg-[#fcfcfc] py-12 md:py-16 relative overflow-hidden">
            {/* Background Decorative Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.4]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />

            <div className="max-w-[1200px] mx-auto px-[clamp(24px,5vw,64px)] relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#E02424] text-[12px] uppercase tracking-[0.3em] font-bold block mb-4">
                            Our Expertise
                        </span>
                        <h2 className="text-[clamp(40px,5vw,64px)] font-medium text-neutral-900 tracking-tightest leading-none">
                            Growth-Driven Digital Services We Offer
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-neutral-500 text-lg max-w-[600px] leading-relaxed"
                    >
                        End-to-end digital solutions crafted to build visibility, drive engagement, and deliver measurable business outcomes across every digital touchpoint.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            index={index}
                            title={service.title}
                            href={service.href}
                            description={service.description}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                            isFullWidth={index === services.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
