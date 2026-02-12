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
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }

        updateTimeoutRef.current = window.setTimeout(() => {
          const visibleSections = sections
            .map(id => {
              const element = document.getElementById(id);
              if (!element) return null;
              
              const rect = element.getBoundingClientRect();
              const viewportHeight = window.innerHeight;
              
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
            visibleSections.sort((a, b) => {
              if (a.top >= 0 && a.top < 200) return -1;
              if (b.top >= 0 && b.top < 200) return 1;

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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
        <path d="M2.36407 12.9579C1.98463 10.3208 1.79491 9.00229 2.33537 7.87495C2.87583 6.7476 4.02619 6.06234 6.32691 4.69181L7.71175 3.86687C9.80104 2.62229 10.8457 2 12 2C13.1543 2 14.199 2.62229 16.2882 3.86687L17.6731 4.69181C19.9738 6.06234 21.1242 6.7476 21.6646 7.87495C22.2051 9.00229 22.0154 10.3208 21.6359 12.9579L21.3572 14.8952C20.8697 18.2827 20.626 19.9764 19.451 20.9882C18.2759 22 16.5526 22 13.1061 22H10.8939C7.44737 22 5.72409 22 4.54903 20.9882C3.37396 19.9764 3.13025 18.2827 2.64284 14.8952L2.36407 12.9579Z" stroke="currentColor" strokeWidth="1.5"></path> 
        <path d="M12 15L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> </g>
        </svg>
      )
    },
    { 
      id: 'about', 
      label: 'About',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
        <path d="M4 11H16C17.8856 11 18.8284 11 19.4142 11.5858C20 12.1716 20 13.1144 20 15V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V11Z" stroke="currentColor" strokeWidth="1.5"></path> 
        <path d="M4.00128 10.9997C3.51749 9.19412 3.27559 8.29135 3.48364 7.51489C3.61994 7.00622 3.88773 6.5424 4.2601 6.17003C4.82851 5.60162 5.73128 5.35973 7.53682 4.87593L14.5398 2.99949C15.213 2.8191 15.5496 2.72891 15.8445 2.70958C17.0553 2.63022 18.1946 3.28804 18.7313 4.37629C18.862 4.64129 18.9522 4.97791 19.1326 5.65114C19.1927 5.87556 19.2228 5.98776 19.2292 6.08604C19.2557 6.48964 19.0364 6.86943 18.6736 7.04832C18.5853 7.09188 18.4731 7.12195 18.2487 7.18208L4.00128 10.9997Z" stroke="currentColor" strokeWidth="1.5"></path> 
        <path d="M14.7004 2.94135L14.0627 8.28861" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
        <path d="M8.42209 4.62396L7.78433 9.97123" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> </g>
        </svg>
      )
    },
    { 
      id: 'skills', 
      label: 'Skills',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
        <path d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z" stroke="currentColor" strokeWidth="1.5"></path> 
        <path d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10" stroke="currentColor" strokeWidth="1.5"></path> 
        <path d="M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C13.2339 20 14.2268 19.6028 16.2127 18.8085L19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14" stroke="currentColor" strokeWidth="1.5"></path> </g>
        </svg>
      )
    },
    { 
      id: 'projects', 
      label: 'Projects',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
        <path d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V11C22 13.8284 22 15.2426 21.1213 16.1213C20.2426 17 18.8284 17 16 17H8C5.17157 17 3.75736 17 2.87868 16.1213C2 15.2426 2 13.8284 2 11V10Z" stroke="currentColor" strokeWidth="1.5"></path> 
        <path d="M16 22H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
        <path d="M12 17L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
        <path d="M22 9H9M9,9L9,9L9,9L9,9L9,9L9,9L9,9L9,9L9,9L9,9L9,9L9,9L9,9L9,9L-0,-0L-0,-0L-0,-0L-0,-0Z" stroke="currentColor" strokeWidth="0"></path> </g>
        </svg>
      )
    },
    { 
      id: 'contact', 
      label: 'Contact',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"></circle> 
        <path d="M13 15C13 16.1046 13 17 9 17C5 17 5 16.1046 5 15C5 13.8954 6.79086 13 9 13C11.2091 13 13 13.8954 13 15Z" stroke="currentColor" strokeWidth="1.5"></path> 
        <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="currentColor" strokeWidth="1.5"></path> 
        <path d="M19 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
        <path d="M19 9H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
        <path d="M19 15H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> </g>
        </svg>
      )
    },
  ];

  const themeIcon = isDark ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"></circle> 
    <path d="M12 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
    <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
    <path d="M4 12L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
    <path d="M22 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
    <path d="M19.7778 4.22266L17.5558 6.25424" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
    <path d="M4.22217 4.22266L6.44418 6.25424" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
    <path d="M6.44434 17.5557L4.22211 19.7779" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
    <path d="M19.7778 19.7773L17.5558 17.5551" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> </g>
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
    <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z" fill="currentColor"></path> </g>
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