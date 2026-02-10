import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';

import styles from './Hero.module.css';

export const Hero = () => {
  const roles = [
    'Frontend Development',
    'Web Applications',
    'Mobile Applications',
    'Interaction & UI'
  ];

  const titleWords = [
    ['Crafting', 'Digital'],
    ['Experiences', 'With'],
    ['Intent']
  ];

  const TYPING_SPEED = 60;
  const DELETING_SPEED = 40;
  const HOLD_AFTER_TYPING = 1200;

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[roleIndex];
    let timeout: number;

    if (!isDeleting && displayText.length < fullText.length) {
      timeout = window.setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, TYPING_SPEED);
    } 
    else if (isDeleting && displayText.length > 0) {
      timeout = window.setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length - 1));
      }, DELETING_SPEED);
    } 
    else if (!isDeleting && displayText.length === fullText.length) {
      timeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, HOLD_AFTER_TYPING);
    } 
    else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);


  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const lineVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Frontend Engineer · Motion & Interaction
        </motion.div>

        <motion.h1
          className={styles.title}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {titleWords.map((line, i) => (
            <motion.span key={i} className={styles.titleLine} variants={lineVariants}>
              {line.map((word, j) => (
                <motion.span key={j} className={styles.word} variants={wordVariants}>
                  {word}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          Building precise, considered user interfaces
        </motion.p>

        <motion.div
          className={styles.roles}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span>Working on</span>
          <span className={styles.typeText}>
            {displayText}
            <span className={styles.cursor} />
          </span>
        </motion.div>
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className={styles.mouse}>
            <motion.div
              className={styles.wheel}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span>Scroll</span>
        </motion.div>
      </div>
    </section>
  );
};
