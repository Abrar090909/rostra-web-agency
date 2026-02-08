import React from 'react';
import { motion } from 'framer-motion';

const ValueCard: React.FC<{
    index: number;
    value: string;
    label: string;
    subLabel: string;
    variant: 'red' | 'grey' | 'light-grey';
}> = ({ index, value, label, subLabel, variant }) => {
    const isRed = variant === 'red';
    const isGrey = variant === 'grey';
    const isLightGrey = variant === 'light-grey';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`
        relative overflow-hidden rounded-[32px] p-10 h-[320px] flex flex-col justify-between group
        ${isRed ? 'bg-[#E02424] text-white shadow-xl shadow-red-500/10' : ''}
        ${isGrey ? 'bg-[rgb(32,32,32)] text-white border border-white/5' : ''}
        ${isLightGrey ? 'bg-[rgb(245,245,245)] text-neutral-900 border border-neutral-100' : ''}
      `}
        >
            {/* Background Graphics */}
            {isRed && (
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-[60px] pointer-events-none" />
            )}
            {isGrey && (
                <div className="absolute -bottom-10 -right-10 opacity-30 pointer-events-none">
                    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0" fill="#E02424" />
                    </svg>
                </div>
            )}
            {isLightGrey && (
                <div className="absolute -bottom-10 -right-10 opacity-[0.05] pointer-events-none">
                    <svg width="240" height="240" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="#E02424" />
                    </svg>
                </div>
            )}

            {/* Content */}
            <div className="relative z-10">
                <h3 className={`text-7xl font-bold tracking-tighter ${isLightGrey ? 'text-[#E02424]' : 'text-white'}`}>
                    {value}
                </h3>
            </div>

            <div className="relative z-10 text-right flex flex-col items-end">
                <span className={`text-xs font-bold uppercase tracking-widest mb-1 ${isLightGrey ? 'text-neutral-400' : 'text-white/40'}`}>
                    {label}
                </span>
                <span className="text-2xl font-bold leading-tight">
                    {subLabel}
                </span>
            </div>
        </motion.div>
    );
};

const ValueCardsSection: React.FC = () => {
    const stats = [
        {
            value: "95+",
            label: "Percent",
            subLabel: "customer satisfaction",
            variant: "red" as const
        },
        {
            value: "2+",
            label: "Years",
            subLabel: "of experience",
            variant: "grey" as const
        },
        {
            value: "24+",
            label: "Projects",
            subLabel: "completed",
            variant: "light-grey" as const
        }
    ];

    return (
        <section className="bg-[rgb(17,17,17)] pt-32 md:pt-48 pb-24 md:pb-32 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-[clamp(24px,5vw,64px)]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <ValueCard
                            key={index}
                            index={index}
                            {...stat}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValueCardsSection;
