
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InternalPageLayout from './InternalPageLayout';
import Footer from './Footer';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const BookACallPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        projectType: 'Web Design',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await addDoc(collection(db, 'bookings'), {
                name: formData.name.trim(),
                email: formData.email.trim(),
                company: formData.company.trim(),
                projectType: formData.projectType,
                message: formData.message.trim(),
                timestamp: serverTimestamp()
            });
            setIsSuccess(true);
            setFormData({ name: '', email: '', company: '', projectType: 'Web Design', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            console.error("Error adding document: ", err);
            setError("Failed to book a call. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <InternalPageLayout>
            <section>
                <div className="max-w-[1200px] mx-auto">
                    <div className="mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <div className="w-2 h-2 rounded-full bg-[#E02424]" />
                            <span className="text-white/40 text-[12px] font-medium tracking-[0.2em] uppercase">
                                {'{04}'} — Booking
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="headline-text font-medium tracking-tightest leading-[1.05] mb-12 max-w-[900px]"
                        >
                            Book a call to start your journey<span className="text-[#E02424]">.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-[clamp(1.1rem,2vw,1.6rem)] text-white/40 max-w-[600px] leading-relaxed mb-24"
                        >
                            Ready to elevate your digital presence? Choose a time or share your project details below.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="flex flex-col gap-12"
                        >
                            <div>
                                <h3 className="text-2xl font-medium mb-6">Why book with us?</h3>
                                <ul className="flex flex-col gap-6">
                                    {[
                                        "Direct talk with our lead designers",
                                        "Understand our design process in detail",
                                        "Get a rough timeline and cost estimate",
                                        "Personalized strategy for your brand"
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 items-center">
                                            <div className="w-5 h-5 rounded-full border border-[#E02424] flex items-center justify-center p-1">
                                                <div className="w-full h-full rounded-full bg-[#E02424]" />
                                            </div>
                                            <span className="text-white/60">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                                <span className="text-white/20 text-[11px] font-bold uppercase tracking-[0.3em] block mb-2">Our location</span>
                                <p className="text-white/60">
                                    Delhi, India
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10"
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-white/20 text-[11px] font-bold uppercase tracking-[0.2em]">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Jane Smith"
                                            className="bg-transparent border-b border-white/10 py-3 focus:border-[#E02424] transition-colors outline-none text-white text-lg"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-white/20 text-[11px] font-bold uppercase tracking-[0.2em]">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="jane@company.com"
                                            className="bg-transparent border-b border-white/10 py-3 focus:border-[#E02424] transition-colors outline-none text-white text-lg"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-white/20 text-[11px] font-bold uppercase tracking-[0.2em]">Company</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Inc. Ltd"
                                            className="bg-transparent border-b border-white/10 py-3 focus:border-[#E02424] transition-colors outline-none text-white text-lg"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-white/20 text-[11px] font-bold uppercase tracking-[0.2em]">Project Type</label>
                                        <select
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleChange}
                                            className="bg-transparent border-b border-white/10 py-3 focus:border-[#E02424] transition-colors outline-none text-white text-lg appearance-none cursor-pointer"
                                        >
                                            <option className="bg-[#111]" value="Web Design">Web Design</option>
                                            <option className="bg-[#111]" value="Full Development">Full Development</option>
                                            <option className="bg-[#111]" value="Brand Identity">Brand Identity</option>
                                            <option className="bg-[#111]" value="E-commerce">E-commerce</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="text-white/20 text-[11px] font-bold uppercase tracking-[0.2em]">What should we discuss?</label>
                                    <textarea
                                        required
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your goals..."
                                        rows={4}
                                        className="bg-transparent border-b border-white/10 py-3 focus:border-[#E02424] transition-colors outline-none text-white text-lg resize-none"
                                    />
                                </div>

                                <AnimatePresence>
                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-red-500 text-sm font-medium"
                                        >
                                            {error}
                                        </motion.p>
                                    )}
                                    {isSuccess && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-green-500 text-sm font-medium"
                                        >
                                            Request sent! We'll reach out to schedule your call.
                                        </motion.p>
                                    )}
                                </AnimatePresence>


                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting || isSuccess}
                                    whileHover={{ scale: 1.02, backgroundColor: isSubmitting ? '#444' : isSuccess ? '#22c55e' : '#c51f1f' }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`${isSubmitting ? 'bg-neutral-800' : isSuccess ? 'bg-green-500' : 'bg-[#E02424]'} text-white px-10 py-5 rounded-full flex items-center justify-center gap-4 group transition-all shadow-[0_10px_30px_rgba(224,36,36,0.3)] disabled:cursor-not-allowed`}
                                >
                                    <span className="text-sm font-bold uppercase tracking-widest">
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-3">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                                                />
                                                Requesting...
                                            </div>
                                        ) : isSuccess ? (
                                            'Request Sent!'
                                        ) : (
                                            'Request Call'
                                        )}
                                    </span>
                                    {!isSubmitting && !isSuccess && (
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-45">
                                                <path d="M12 5V19M5 12l7-7 7 7" />
                                            </svg>
                                        </div>
                                    )}
                                    {isSuccess && (
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
            <Footer />
        </InternalPageLayout>
    );
};

export default BookACallPage;
