import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Hooks
import { useCursor } from '../../hooks/useCursor';

// Styles
import styles from './Navigation.module.css';

// Assets
import logo from '../../assets/images/sw-1.png';
import menuIcon from '../../assets/images/sw-menu.png';

interface NavigationProps {
  scrollTo: (target: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navigation = ({ 
  scrollTo, 
  isDark, 
  toggleTheme 
}: NavigationProps) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const updateTimeoutRef = useRef<number | null>(null);
  const { registerMagneticTarget } = useCursor();

  useEffect(() => {
    // Lightsaber sound effect
    audioRef.current = new Audio('https://www.soundjay.com/misc/sounds/lightsaber-on-1.mp3');
    audioRef.current.volume = 0.3;
  }, []);

  useEffect(() => {
    const cleanups = navItemsRef.current
      .filter(Boolean)
      .map(el => el && registerMagneticTarget(el, 'nav', 0.25));

    return () => cleanups.forEach(cleanup => cleanup?.());
  }, [registerMagneticTarget]);

  useEffect(() => {
    const sections = [
      'hero', 
      'about', 
      'skills', 
      'projects', 
      'contact'
    ];
    
    const observer = new IntersectionObserver(
      () => {
        // Clear any pending updates
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }

        // Debounce the update to avoid flickering
        updateTimeoutRef.current = window.setTimeout(() => {
          // Find all visible sections
          const visibleSections = sections
            .map(id => {
              const element = document.getElementById(id);
              if (!element) return null;
              
              const rect = element.getBoundingClientRect();
              const viewportHeight = window.innerHeight;
              
              // Calculate section visibility
              const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
              const visibilityRatio = visibleHeight / viewportHeight;
              
              return {
                id,
                top: rect.top,
                visibilityRatio,
                isInView: rect.top < viewportHeight / 2 && rect.bottom > 0
              };
            })
            .filter((section): section is NonNullable<typeof section> => 
              section !== null && section.isInView
            );

          if (visibleSections.length > 0) {
            // Sort by which section's top is closest to the top of viewport
            visibleSections.sort((a, b) => {
              // If a section's top is near the top of viewport (within 200px), prioritize it
              if (a.top >= 0 && a.top < 200) return -1;
              if (b.top >= 0 && b.top < 200) return 1;
              
              // Otherwise, prioritize the section with more visibility
              return b.visibilityRatio - a.visibilityRatio;
            });

            setActiveSection(visibleSections[0].id);
          }
        }, 100);
      },
      { 
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px'
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleNavClick = (id: string) => {
    if (id === 'theme') {
      toggleTheme();
      setIsMobileMenuOpen(false);
    } else {
      scrollTo(id);
      setIsMobileMenuOpen(false);
    }
  };

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const navItems = [
    { 
      id: 'hero', 
      label: 'Home',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    { 
      id: 'about', 
      label: 'About',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    { 
      id: 'skills', 
      label: 'Skills',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      )
    },
    { 
      id: 'projects', 
      label: 'Projects',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
    { 
      id: 'contact', 
      label: 'Contact',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    },
  ];

  const themeIcon = isDark ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5ZM6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.75 3V5.25H11.25V3H12.75Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M21 12.75L18.75 12.75L18.75 11.25L21 11.25L21 12.75Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M18.8943 6.16637L17.3033 7.75736L16.2426 6.6967L17.8336 5.10571L18.8943 6.16637Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.8336 18.8944L16.2426 17.3034L17.3033 16.2428L18.8943 17.8337L17.8336 18.8944Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.75 18.75V21H11.25V18.75H12.75Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.25 12.75L3 12.75L3 11.25L5.25 11.25L5.25 12.75Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.75732 17.3033L6.16633 18.8943L5.10567 17.8337L6.69666 16.2427L7.75732 17.3033Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.69666 7.75744L5.10567 6.16645L6.16633 5.10579L7.75732 6.69678L6.69666 7.75744Z" fill="currentColor"/>
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.203 6.02337C7.59276 6.99074 5.45107 10.6948 6.41557 14.2943C7.38006 17.8938 11.0868 20.0307 14.6971 19.0634C16.1096 18.6849 17.2975 17.8877 18.1626 16.8409C15.1968 17.3646 12.2709 15.546 11.4775 12.585C10.7644 9.92365 12.0047 7.20008 14.3182 5.92871C13.3186 5.72294 12.2569 5.74098 11.203 6.02337ZM4.96668 14.6825C3.78704 10.2801 6.40707 5.75553 10.8148 4.57448C12.968 3.99752 15.1519 4.3254 16.9581 5.32413L16.6781 6.72587C16.4602 6.75011 16.241 6.79108 16.0218 6.8498C13.6871 7.47537 12.303 9.8703 12.9264 12.1968C13.5497 14.5233 15.9459 15.9053 18.2806 15.2797C18.7257 15.1604 19.1351 14.9774 19.5024 14.7435L20.5991 15.6609C19.6542 17.9633 17.6796 19.8171 15.0853 20.5123C10.6776 21.6933 6.14631 19.085 4.96668 14.6825Z" fill="currentColor"/>
    </svg>
  );

  return (
    <>
      <motion.nav
        className={styles.nav}
        data-theme={isDark ? 'dark' : 'light'}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={logo}
          alt="J.A.V logo"
          className={`${styles.logoImg} ${styles.desktopOnly}`}
          onClick={() => scrollTo('hero')}
        />

        <ul className={styles.navList}>
          {navItems.map((item, index) => (
            <li key={item.id}>
              <button
                ref={(el) => {
                  navItemsRef.current[index] = el;
                }}
                onClick={() => handleNavClick(item.id)}
                className={`${styles.navItem} ${
                  activeSection === item.id ? styles.active : ''
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label="Toggle theme"
        >
          {themeIcon}
        </button>

        <AnimatePresence mode="wait">
          {!isMobileMenuOpen && (
            <motion.button
              onClick={toggleMobileMenu}
              className={styles.mobileMenuTrigger}
              aria-label="Open mobile menu"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <img src={menuIcon} alt="Open menu" className={styles.menuIcon} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* data-theme drives CSS variable swapping on the blade + panel */}
            <motion.div
              className={styles.lightsaberBlade}
              data-theme={isDark ? 'dark' : 'light'}
              initial={{ height: 0 }}
              animate={{ height: '100vh' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />

            <motion.div
              className={styles.mobileMenu}
              data-theme={isDark ? 'dark' : 'light'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <motion.button
                onClick={toggleMobileMenu}
                className={styles.mobileMenuClose}
                aria-label="Close mobile menu"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <img src={logo} alt="Close menu" className={styles.closeIcon} />
              </motion.button>

              <motion.ul className={styles.mobileNavList}>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.4 + (index * 0.1),
                      ease: 'easeOut'
                    }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                      className={`${styles.mobileNavItem} ${
                        activeSection === item.id ? styles.activeMobile : ''
                      }`}
                      aria-label={item.label}
                    >
                      {item.icon}
                    </button>
                  </motion.li>
                ))}
                
                {/* Theme toggle in mobile menu */}
                <motion.li
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.4 + (navItems.length * 0.1),
                    ease: 'easeOut'
                  }}
                >
                  <button
                    onClick={() => handleNavClick('theme')}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      handleNavClick('theme');
                    }}
                    className={styles.mobileNavItem}
                    aria-label="Toggle theme"
                  >
                    {themeIcon}
                  </button>
                </motion.li>
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};