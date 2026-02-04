
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('rostra_cookie_consent');
        if (!consent) {
            // Delay showing to not overwhelm the user immediately
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('rostra_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('rostra_cookie_consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[4000] w-[calc(100%-48px)] max-w-[500px]"
                >
                    <div className="bg-[rgb(28,28,28)] border border-white/10 p-6 md:p-8 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-md">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="text-white font-medium mb-1 tracking-tight">Cookie Consent</h4>
                                <p className="text-white/40 text-[13px] leading-relaxed">
                                    We use cookies to enhance your experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                                </p>
                            </div>
                            <div className="flex gap-3 shrink-0">
                                <button
                                    onClick={handleDecline}
                                    className="px-6 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="bg-[#E02424] text-white px-8 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#c51f1f] transition-all shadow-[0_10px_20px_rgba(224,36,36,0.2)]"
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
