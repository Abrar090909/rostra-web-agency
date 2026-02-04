
import React, { useEffect, useState } from 'react';
import CardNav from './components/CardNav';
import Hero from './components/Hero';
import StatsAndIntro from './components/StatsAndIntro';
import Projects from './components/Projects';
import ToolsSection from './components/ToolsSection';
import ProcessSection from './components/ProcessSection';
import HowItWorksExtension from './components/HowItWorksExtension';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';
import BookACallPage from './components/BookACallPage';
import AuthModal from './components/AuthModal';
import CookieBanner from './components/CookieBanner';
import { auth } from './firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'projects' | 'contact' | 'book-a-call'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#about') setCurrentView('about');
      else if (hash === '#projects') setCurrentView('projects');
      else if (hash === '#contact') setCurrentView('contact');
      else if (hash === '#book-a-call') setCurrentView('book-a-call');
      else setCurrentView('home');

      // Scroll to top on route change
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogoutConfirm(false);
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  // Data URI for the Rostra Logo
  const logoDataUri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJyBmaWxsPScjMDAwJz48cGF0aCBkPSdNMjUgMTVoMzBjMTUgMCAyNSAxMCAyNSAyMnMtMTAgMjItMjUgMjJINTV2MjZjMCAwLTIwIDAtMjAtNVYxNXptMjAgMzBoMTBjNSAwIDctMyA3LTdzLTItNy03LTdINTV2MTR6JyAvPjwvc3ZnPg==";

  const navItems = [
    {
      label: "About",
      bgColor: "#E02424",
      textColor: "#fff",
      links: [
        { label: "Company", href: "#about", ariaLabel: "About Company" }
      ]
    },
    {
      label: "Projects",
      bgColor: "#E02424",
      textColor: "#fff",
      links: [
        { label: "Selected Work", href: "#projects", ariaLabel: "View all projects" }
      ]
    },
    {
      label: "Contact Us",
      bgColor: "#E02424",
      textColor: "#fff",
      links: [
        { label: "Start a project", href: "#book-a-call", ariaLabel: "Book a call" }
      ]
    }
  ];

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
      default:
        return (
          <>
            <Hero />
            <StatsAndIntro />
            <Projects />
            <ToolsSection />
            <ProcessSection />
            <HowItWorksExtension />
            <Testimonials />
            <FAQ />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-red-600 selection:text-white bg-white">
      {currentView === 'home' && (
        <div className="absolute inset-0 h-screen hero-bg-gradient pointer-events-none" />
      )}

      {currentView === 'home' && (
        <CardNav
          logo={logoDataUri}
          logoAlt="Rostra Logo"
          items={navItems}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
          user={user}
          onAuthClick={() => setIsAuthModalOpen(true)}
          onLogout={() => setShowLogoutConfirm(true)}
        />
      )}

      <main className="relative z-10">
        {renderContent()}
      </main>

      <footer className="fixed bottom-8 left-8 md:left-12 text-[10px] md:text-xs font-medium text-neutral-400 tracking-wider z-50 mix-blend-difference">
        (2024 – PRESENT)
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <CookieBanner />

      {/* Logout Confirmation Popup */}
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
  );
};

export default App;
