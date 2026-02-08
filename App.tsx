
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsAndIntro from './components/StatsAndIntro';
import Projects from './components/Projects';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import ValueCardsSection from './components/ValueCardsSection';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import TermsConditionsPage from './components/TermsConditionsPage';
import LoadingScreen from './components/LoadingScreen';
import AboutPage from './components/AboutPage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';
import BookACallPage from './components/BookACallPage';
import AuthModal from './components/AuthModal';
import CookieBanner from './components/CookieBanner';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import WebsiteDevelopmentPage from './components/WebsiteDevelopmentPage';
import BrandingCreativePage from './components/BrandingCreativePage';
import LeadGenerationPage from './components/LeadGenerationPage';
import DigitalMarketingPage from './components/DigitalMarketingPage';
import AdvertisingPerformancePage from './components/AdvertisingPerformancePage';
import { auth } from './firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'projects' | 'contact' | 'book-a-call' | 'privacy' | 'terms' | 'web-dev' | 'branding' | 'lead-gen' | 'marketing' | 'ads'>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const lenisRef = React.useRef<Lenis | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const handleHashChange = () => {
      const hash = window.location.hash;
      console.log("Hash changed to:", hash);
      if (hash === '#about') setCurrentView('about');
      else if (hash === '#home' || hash === '') setCurrentView('home');
      else if (hash === '#projects') setCurrentView('projects');
      else if (hash === '#contact') setCurrentView('contact');
      else if (hash === '#book-a-call') setCurrentView('book-a-call');
      else if (hash === '#privacy') setCurrentView('privacy');
      else if (hash === '#terms') setCurrentView('terms');
      else if (hash === '#service-web-dev') setCurrentView('web-dev');
      else if (hash === '#service-branding') setCurrentView('branding');
      else if (hash === '#service-lead-gen') setCurrentView('lead-gen');
      else if (hash === '#service-digital-marketing') setCurrentView('marketing');
      else if (hash === '#service-ads') setCurrentView('ads');
      else if (['#services', '#testimonials', '#process', '#our-world'].includes(hash)) {
        setCurrentView('home');
      } else {
        setCurrentView('home');
      }

      // If it's a section hash, let Lenis or native scroll handle it after view swap
      if (hash && hash.startsWith('#') && hash !== '#') {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el && lenisRef.current) {
            lenisRef.current.scrollTo(el);
          }
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check is handled by the isLoading effect below

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.0,
      syncTouch: false,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      unsubscribe();
      window.removeEventListener('hashchange', handleHashChange);
      lenis.destroy();
    };
  }, []);

  // Ensure we always start at the top (Hero) when the loading screen completes.
  // This prevents the page from jumping to sections like #testimonials on a fresh visit/refresh.
  useEffect(() => {
    if (!isLoading) {
      // Clear hash if we want to be absolute, but scrolling is usually sufficient for a clean entry.
      // We force Lenis to start at 0 immediately after the loader exits.
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }

      // Clear any deep-link hash (like #testimonials) from the URL to keep it clean on initial load.
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }

      // We don't automatically scroll to the hash on mount anymore to ensure Hero is always the first view.
      // Manual clicks on links will still work via the hashchange listener.
    }
  }, [isLoading]);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [currentView]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogoutConfirm(false);
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'contact':
        return <ContactPage />;
      case 'book-a-call':
        return <BookACallPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsConditionsPage />;
      case 'web-dev':
        return <WebsiteDevelopmentPage />;
      case 'branding':
        return <BrandingCreativePage />;
      case 'lead-gen':
        return <LeadGenerationPage />;
      case 'marketing':
        return <DigitalMarketingPage />;
      case 'ads':
        return <AdvertisingPerformancePage />;
      default:
        return (
          <>
            <Hero />
            <StatsAndIntro />
            <Projects />
            <ServicesSection />
            <ProcessSection />
            <ValueCardsSection />
            <Testimonials />
            <FAQ />
          </>
        );
    }
  };

  // Pages that either manage their own footer or shouldn't have one
  const isStandalonePage = ['about', 'projects', 'contact', 'book-a-call', 'privacy', 'terms', 'web-dev', 'branding', 'lead-gen', 'marketing', 'ads'].includes(currentView);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={`relative min-h-screen selection:bg-red-600 selection:text-white bg-white transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-1'}`}>
        <div className="fixed top-0 left-0 right-0 z-[2000] pointer-events-none">
          <AnimatePresence>
            {user && (
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="mt-4 mr-4 flex justify-end"
              >
                <div className="bg-white/90 backdrop-blur-md border border-neutral-100 p-2 rounded-2xl shadow-xl flex items-center gap-4 pointer-events-auto">
                  <div className="flex flex-col items-end px-2">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Logged In</span>
                    <span className="text-sm font-bold text-neutral-900">{user.displayName || user.email?.split('@')[0]}</span>
                  </div>
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-10 h-10 bg-[#E02424] text-white rounded-xl flex items-center justify-center hover:bg-[#c51f1f] transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {currentView === 'home' && (
          <div className="absolute inset-0 h-screen hero-bg-gradient pointer-events-none" />
        )}

        <Navbar />

        <main className="relative z-10">
          {renderContent()}
          {!isStandalonePage && currentView === 'home' && <div className="mt-20" />}
        </main>

        {!isStandalonePage && <Footer />}

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />

        <CookieBanner />

        <AnimatePresence>
          {showLogoutConfirm && (
            <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowLogoutConfirm(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-[400px] bg-[rgb(17,17,17)] border border-white/10 p-8 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] text-center"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E02424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-2">Sign out?</h3>
                  <p className="text-white/40 text-sm">Are you sure you want to log out of your account?</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-[#E02424] text-white py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-[#c51f1f] transition-colors"
                  >
                    Yes, Sign Out
                  </button>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="w-full bg-white/5 text-white/60 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default App;
