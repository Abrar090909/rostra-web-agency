import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleVideoEnd = () => {
        setIsVisible(false);
        setTimeout(onLoadingComplete, 600);
    };

    useEffect(() => {
        // Fallback safety timer
        const timer = setTimeout(() => {
            if (isVisible) {
                setIsVisible(false);
                setTimeout(onLoadingComplete, 600);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [isVisible, onLoadingComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-[#fcfcfc] flex items-center justify-center p-6"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="relative w-full max-w-[240px] md:max-w-[320px]">
                        <video
                            autoPlay
                            muted
                            playsInline
                            onEnded={handleVideoEnd}
                            className="w-full h-full object-contain mix-blend-multiply"
                        >
                            <source src="/loading-video.mp4" type="video/mp4" />
                        </video>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
