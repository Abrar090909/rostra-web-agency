
import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { User } from 'firebase/auth';

// Local implementation of GoArrowUpRight to avoid external dependencies
const GoArrowUpRight = ({ className }: { className?: string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 19V7H6v2h9.59L4.29 20.29l1.42 1.42L17 10.41V19z"></path>
  </svg>
);

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  user?: User | null;
  onAuthClick?: () => void;
  onLogout?: () => void;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor,
  user,
  onAuthClick,
  onLogout
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    const contentEl = contentRef.current;
    if (!navEl || !contentEl) return 280;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const topBarHeight = 60;
    const padding = 16;

    if (isMobile) {
      // Temporary style adjustments to measure correctly
      const wasVisible = contentEl.style.visibility;
      const wasDisplay = contentEl.style.display;
      const wasHeight = contentEl.style.height;

      contentEl.style.visibility = 'hidden';
      contentEl.style.display = 'flex';
      contentEl.style.height = 'auto';

      const contentHeight = contentEl.scrollHeight;

      // Restore previous styles
      contentEl.style.visibility = wasVisible;
      contentEl.style.display = wasDisplay;
      contentEl.style.height = wasHeight;

      return topBarHeight + contentHeight + padding;
    }

    // Desktop default height
    return 280;
  }, []);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 30, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight(),
      duration: 0.5,
      ease
    });

    tl.to(cardsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease,
      stagger: 0.05
    }, '-=0.2');

    return tl;
  }, [calculateHeight, ease]);

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [createTimeline]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current || !navRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.to(navRef.current, { height: newHeight, duration: 0.3, ease });
      } else {
        gsap.set(navRef.current, { height: 60 });
      }

      // Re-create timeline on resize to handle layout shifts
      const currentProgress = tlRef.current.progress();
      tlRef.current.kill();
      const newTl = createTimeline();
      if (newTl) {
        tlRef.current = newTl;
        tlRef.current.progress(currentProgress);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded, calculateHeight, createTimeline, ease]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsExpanded(true);
      tl.play();
    } else {
      tl.reverse().eventCallback('onReverseComplete', () => {
        setIsExpanded(false);
      });
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const getUserName = () => {
    if (!user) return '';
    if (user.displayName) return user.displayName.split(' ')[0];
    return user.email?.split('@')[0] || 'User';
  };

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[92%] max-w-[800px] z-[999] top-[1.5rem] md:top-[2.5rem] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden will-change-[height] border border-black/5`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 md:px-6 z-[10]">
          {/* Hamburger Menu - Accessible and larger touch area */}
          <button
            className={`hamburger-menu flex flex-col items-center justify-center cursor-pointer gap-[5px] h-10 w-10 md:order-none order-2 rounded-lg hover:bg-black/5 transition-colors`}
            onClick={toggleMenu}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="card-nav-dropdown"
            style={{ color: menuColor || '#000' }}
          >
            <div
              className={`hamburger-line w-[24px] h-[2px] bg-current transition-all duration-300 ${isExpanded ? 'translate-y-[7px] rotate-45' : ''
                }`}
            />
            <div
              className={`hamburger-line w-[24px] h-[2px] bg-current transition-all duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'
                }`}
            />
            <div
              className={`hamburger-line w-[24px] h-[2px] bg-current transition-all duration-300 ${isExpanded ? '-translate-y-[7px] -rotate-45' : ''
                }`}
            />
          </button>

          {/* Logo - Centered on desktop, left on mobile */}
          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
            <img src={logo} alt={logoAlt} className="logo h-[24px] md:h-[28px] object-contain" />
          </div>

          {/* CTA - Sign Up or Greeting */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={user ? onLogout : onAuthClick}
              className="card-nav-cta-button border-0 rounded-xl px-5 items-center h-10 font-bold uppercase text-[10px] tracking-[0.2em] cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: buttonBgColor || '#111', color: buttonTextColor || '#fff' }}
            >
              {user ? `Logout` : 'Sign Up'}
            </button>
            {user && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                Hi, {getUserName()}
              </span>
            )}
          </div>
        </div>

        {/* Dropdown Content */}
        <div
          id="card-nav-dropdown"
          ref={contentRef}
          className={`card-nav-content absolute left-0 right-0 top-[60px] p-3 flex flex-col items-stretch gap-3 justify-start z-[5] ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } md:flex-row md:items-stretch md:h-[200px] md:gap-3`}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card relative flex flex-col gap-3 p-5 rounded-xl min-h-[100px] md:min-h-0 flex-1"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-medium tracking-tightest text-[20px] md:text-[24px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-2">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-2 no-underline cursor-pointer transition-all duration-300 hover:pl-1 text-[13px] md:text-[14px] font-medium text-white/70 hover:text-white"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                  >
                    <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Mobile Login/Logout Item */}
          <div className="md:hidden nav-card relative flex flex-col gap-3 p-5 rounded-xl min-h-[100px] bg-black text-white">
            <div className="nav-card-label font-medium tracking-tightest text-[20px]">
              {user ? `Hi, ${getUserName()}` : 'Account'}
            </div>
            <div className="nav-card-links mt-auto">
              <button
                onClick={user ? onLogout : onAuthClick}
                className="nav-card-link inline-flex items-center gap-2 no-underline cursor-pointer transition-all duration-300 hover:pl-1 text-[13px] font-medium text-white/70 hover:text-white bg-transparent border-0 p-0"
              >
                <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                {user ? 'Logout' : 'Sign Up / Login'}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
