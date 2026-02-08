
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        // Set a hard limit of 6 seconds for the loading screen
        const timer = setTimeout(() => {
            handleComplete();
        }, 6000);

        return () => clearTimeout(timer);
    }, []);

    const handleComplete = () => {
        setIsExiting(true);
        setTimeout(onLoadingComplete, 1000);
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
                >
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/loading-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Optional overlay to soften the video if needed */}
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
