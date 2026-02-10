import { useRef, useEffect, useState } from 'react';
import styles from './About.module.css';

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const crawlRef = useRef<HTMLDivElement>(null);
  const [hasLeft, setHasLeft] = useState(false);
  const [speed, setSpeed] = useState<1 | 2 | 3>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isAboutInView, setIsAboutInView] = useState(false);
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!starsRef.current) return;

    const stars: HTMLDivElement[] = [];
    for (let i = 0; i < 500; i++) {
      const star = document.createElement('div');
      star.className = styles.star;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.width = `${Math.random() * 3}px`;
      star.style.height = star.style.width;
      stars.push(star);
    }

    stars.forEach(star => starsRef.current?.appendChild(star));

    return () => {
      stars.forEach(star => star.remove());
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        // Check if About section is fully or significantly in view
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setIsAboutInView(true);
        } else {
          setIsAboutInView(false);
        }
        
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setHasLeft(true);
        } else if (entry.isIntersecting && hasLeft) {
          if (crawlRef.current) {
            crawlRef.current.style.animation = 'none';
            void crawlRef.current.offsetHeight;
            crawlRef.current.style.animation = '';
          }
          setHasLeft(false);
        }
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasLeft]);

  // Auto-hide controls after 3 seconds of inactivity (only when About is in view)
  useEffect(() => {
    if (!isAboutInView) return;

    const resetHideTimer = () => {
      setShowControls(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    const handleMouseMove = () => resetHideTimer();
    const handleMouseEnter = () => resetHideTimer();

    if (sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', handleMouseMove);
      sectionRef.current.addEventListener('mouseenter', handleMouseEnter);
    }

    resetHideTimer();

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', handleMouseMove);
        sectionRef.current.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, [isAboutInView]);

  const handleSpeedChange = (newSpeed: 1 | 2 | 3) => {
    if (!crawlRef.current || newSpeed === speed) return;

    const animations = crawlRef.current.getAnimations();
    
    if (animations.length > 0) {
      const animation = animations[0] as CSSAnimation;
      const currentTime = animation.currentTime as number;
      const totalDuration = animation.effect?.getTiming().duration as number;
      const progress = currentTime / totalDuration;

      setSpeed(newSpeed);

      requestAnimationFrame(() => {
        if (!crawlRef.current) return;
        
        const newAnimations = crawlRef.current.getAnimations();
        if (newAnimations.length > 0) {
          const newAnimation = newAnimations[0] as CSSAnimation;
          const newDuration = newAnimation.effect?.getTiming().duration as number;
          
          newAnimation.currentTime = progress * newDuration;
        }
      });
    } else {
      setSpeed(newSpeed);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.stars} ref={starsRef}></div>
      <div className={styles.fade}></div>
      
      <div className={`${styles.controls} ${isAboutInView && showControls ? styles.controlsVisible : styles.controlsHidden}`}>
        <div className={styles.controlsWrapper}>
          <button 
            className={styles.playPauseBtn} 
            onClick={togglePause}
            aria-label={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            )}
          </button>

          <div className={styles.speedControls}>
            <button
              className={`${styles.speedBtn} ${speed === 1 ? styles.active : ''}`}
              onClick={() => handleSpeedChange(1)}
              aria-label="Normal speed"
            >
              1x
            </button>
            <button
              className={`${styles.speedBtn} ${speed === 2 ? styles.active : ''}`}
              onClick={() => handleSpeedChange(2)}
              aria-label="2x speed"
            >
              2x
            </button>
            <button
              className={`${styles.speedBtn} ${speed === 3 ? styles.active : ''}`}
              onClick={() => handleSpeedChange(3)}
              aria-label="3x speed"
            >
              3x
            </button>
          </div>
        </div>
      </div>

      <section className={styles.starWars}>
        <div 
          className={styles.crawl} 
          ref={crawlRef}
          data-speed={speed}
          data-paused={isPaused}
        >
          <div className={styles.title}>
            <p>Episode XXIII</p>
            <h1>THE CODE AWAKENS</h1>
          </div>

          <p>
            Forged in the modern web,
            a developer emerges—
            building fast, responsive experiences
            for web and mobile platforms.
          </p>

          <p>
            Armed with React, React Native,
            TypeScript, Flutter, and 
            cloud-driven architectures, each 
            application is crafted for scale,
            performance, and longevity.
          </p>

          <p>
            From enterprise SaaS systems
            to mobile apps and microservices,
            every project is shaped with precision,
            clean structure, and a relentless focus
            on seamless user experience.
          </p>

          <p>
            Through API integration,
            thoughtful UI/UX implementation,
            and cloud technologies,
            complex business needs are transformed
            into production-ready solutions.
          </p>

          <p>
            Driven by motion design,
            systems thinking, and 
            elegant engineering, tools
            are built to help teams move 
            faster, think clearer, and 
            build better—together.
          </p>

          <p>
            Performance is refined.
            Usability is sharpened.
            Every line of code serves a purpose.
          </p>

          <p>
            The future is not awaited.
            It is engineered—
            with intention, clarity, and craft.
          </p>
        </div>
      </section>
    </section>
  );
};