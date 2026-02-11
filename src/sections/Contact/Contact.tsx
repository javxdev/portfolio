import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../../hooks/useCursor';
import styles from './Contact.module.css';

const contacts = [
  {
    id: 'email',
    label: 'Email',
    value: 'lexcvillaluz@gmail.com',
    href: 'mailto:lexcvillaluz@gmail.com',
    index: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4h20v16H2V4zm0 0l10 9 10-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'jan-villaluz',
    href: 'https://github.com/javxdev',
    index: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'jan-villaluz',
    href: 'https://www.linkedin.com/in/jan-villaluz-81134523a/',
    index: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+971 52 395 8426',
    href: 'https://wa.me/971523958426',
    index: '04',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
      </svg>
    ),
  },
];

export const Contact = () => {
  const { registerMagneticTarget } = useCursor();
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const cleanups = linkRefs.current.map((ref) => {
      if (ref) return registerMagneticTarget(ref, 'link', 0.3);
      return undefined;
    });
    return () => cleanups.forEach((c) => c?.());
  }, [registerMagneticTarget]);

  return (
    <section id="contact" className={styles.contact}>
      {/* Scanline overlay */}
      <div className={styles.scanlines} aria-hidden="true" />

      <div className={styles.container}>
        {/* Transmission label */}
        <motion.div
          className={styles.transmission}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.transmissionDot} />
          <span>OPEN CHANNEL</span>
          <span className={styles.transmissionLine} />
        </motion.div>

        {/* Heading */}
        <motion.div
          className={styles.headingBlock}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <h2 className={styles.title}>
            Got a Project
            <span className={styles.titleAccent}> in Mind?</span>
          </h2>
          <p className={styles.subtitle}>
            Whether it's a collaboration, a bold idea, or something worth
            building — I'm always open to a good conversation.
          </p>
        </motion.div>

        {/* Contact grid */}
        <div className={styles.grid}>
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.id}
              href={contact.href}
              target={contact.id !== 'email' ? '_blank' : undefined}
              rel={contact.id !== 'email' ? 'noopener noreferrer' : undefined}
              className={styles.card}
              ref={(el) => { linkRefs.current[i] = el; }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <span className={styles.cardIndex}>{contact.index}</span>

              <span className={styles.cardIcon}>{contact.icon}</span>

              <span className={styles.cardBody}>
                <span className={styles.cardLabel}>{contact.label}</span>
                <span className={styles.cardValue}>{contact.value}</span>
              </span>

              <span className={styles.cardArrow} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>

              {/* Hover shimmer */}
              <span className={styles.cardShimmer} aria-hidden="true" />
            </motion.a>
          ))}
        </div>

        {/* Bottom marquee ticker */}
        <motion.div
          className={styles.marqueeWrapper}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className={styles.marqueeTrack}>
            {/* Two identical sets — animation shifts by exactly -50% so the loop is invisible */}
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className={styles.marqueeSet} aria-hidden={setIndex === 1}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={styles.marqueeItem}>
                    MAY THE CODE BE WITH YOU
                    <span className={styles.marqueeSep}>✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background glow */}
      <div className={styles.background} aria-hidden="true">
        <div className={styles.glowLeft} />
        <div className={styles.glowRight} />
        <div className={styles.horizon} />
      </div>
    </section>
  );
};