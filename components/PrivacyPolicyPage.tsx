
import React from 'react';
import InternalPageLayout from './InternalPageLayout';
import Footer from './Footer';
import { motion } from 'framer-motion';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <InternalPageLayout>
            <section className="max-w-[1200px] mx-auto px-8 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-medium mb-12">Privacy Policy<span className="text-[#E02424]">.</span></h1>

                    <div className="space-y-12 text-white/60 leading-relaxed text-lg">
                        <div>
                            <h2 className="text-white text-2xl font-medium mb-4">1. Introduction</h2>
                            <p>
                                At Rostra Agency, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-white text-2xl font-medium mb-4">2. Data We Collect</h2>
                            <p>
                                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                            </p>
                            <ul className="list-disc ml-6 mt-4 space-y-2 font-light">
                                <li>Identity Data (name, username)</li>
                                <li>Contact Data (email address, telephone numbers)</li>
                                <li>Technical Data (IP address, browser type and version)</li>
                                <li>Usage Data (information about how you use our website)</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-white text-2xl font-medium mb-4">3. How We Use Your Data</h2>
                            <p>
                                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform the contract we are about to enter into or have entered into with you, or where it is necessary for our legitimate interests.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-white text-2xl font-medium mb-4">4. Data Security</h2>
                            <p>
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-white text-2xl font-medium mb-4">5. Contact Us</h2>
                            <p>
                                If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:info@rostra.in" className="text-[#E02424]">info@rostra.in</a>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>
            <Footer />
        </InternalPageLayout>
    );
};

export default PrivacyPolicyPage;
