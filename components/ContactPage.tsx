
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InternalPageLayout from './InternalPageLayout';
import Footer from './Footer';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        timestamp: serverTimestamp()
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <InternalPageLayout>
      <section className="pt-48 pb-64 px-[clamp(24px,5vw,64px)]">
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
                {'{03}'} — Contact
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="headline-text font-medium tracking-tightest leading-[1.05] mb-12 max-w-[900px]"
            >
              Let’s build something worth remembering<span className="text-[#E02424]">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[clamp(1.1rem,2vw,1.6rem)] text-white/40 max-w-[600px] leading-relaxed mb-24"
            >
              Have an idea, a product, or a problem? We’re currently taking on new projects for 2025.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="mb-16">
                <span className="text-white/20 text-[11px] font-bold uppercase tracking-[0.3em] block mb-4">Email us</span>
                <a
                  href="mailto:hello@rostra.com"
                  className="text-[clamp(24px,3vw,44px)] font-medium hover:text-[#E02424] transition-colors break-all leading-tight"
                >
                  hello<span className="text-[#E02424]">@</span>rostra.com
                </a>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-white/20 text-[11px] font-bold uppercase tracking-[0.3em]">Social</span>
                  <div className="flex gap-6">
                    {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                      <a key={social} href="#" className="text-white hover:text-[#E02424] transition-colors font-medium">{social}</a>
                    ))}
                  </div>
                </div>

                <div className="pt-12 border-t border-white/5">
                  <p className="text-white/40 text-sm max-w-[300px] leading-relaxed">
                    Based in Dubai, UAE.<br />
                    Operating worldwide.
                  </p>
                </div>
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
                    <label className="text-white/20 text-[11px] font-bold uppercase tracking-[0.2em]">Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="bg-transparent border-b border-white/10 py-3 focus:border-[#E02424] transition-colors outline-none text-white text-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-white/20 text-[11px] font-bold uppercase tracking-[0.2em]">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="bg-transparent border-b border-white/10 py-3 focus:border-[#E02424] transition-colors outline-none text-white text-lg"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-white/20 text-[11px] font-bold uppercase tracking-[0.2em]">Project details</label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
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
                      Message sent successfully! We'll get back to you soon.
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
                        Sending...
                      </div>
                    ) : isSuccess ? (
                      'Message Sent!'
                    ) : (
                      'Send Message'
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

export default ContactPage;
