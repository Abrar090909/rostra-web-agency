
import React from 'react';
import InternalPageLayout from './InternalPageLayout';
import Footer from './Footer';
import { motion } from 'framer-motion';

const TermsConditionsPage: React.FC = () => {
    return (
        <InternalPageLayout>
            <section className="max-w-[1200px] mx-auto px-8 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-medium mb-12">Terms & Conditions<span className="text-[#E02424]">.</span></h1>

                    <div className="space-y-12 text-white/60 leading-relaxed text-lg">
                        <div>
                            <h2 className="text-white text-2xl font-medium mb-4">1. Agreement to Terms</h2>
                            <p>
                                By accessing our website, you agree to be bound by these terms and conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-white text-2xl font-medium mb-4">2. Intellectual Property</h2>
                            <p>
                                The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights, trademarks, and other proprietary rights. The copying, redistribution, use, or publication by you of any such matters or any part of the Site is strictly prohibited.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-white text-2xl font-medium mb-4">3. Disclaimer</h2>
                            <p>
                                The materials on Rostra Agency's website are provided on an 'as is' basis. Rostra Agency makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-white text-2xl font-medium mb-4">4. Limitations</h2>
                            <p>
                                In no event shall Rostra Agency or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Rostra Agency's website.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-white text-2xl font-medium mb-4">5. Governing Law</h2>
                            <p>
                                These terms and conditions are governed by and construed in accordance with the laws of Delhi, India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>
            <Footer />
        </InternalPageLayout>
    );
};

export default TermsConditionsPage;
