import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../../hooks/useCursor';
import styles from './Contact.module.css';

export const Contact = () => {
  const { registerMagneticTarget } = useCursor();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const socialLinksRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (buttonRef.current) {
      const cleanup = registerMagneticTarget(buttonRef.current, 'cta', 0.4);
      return cleanup;
    }
  }, [registerMagneticTarget]);

  useEffect(() => {
    const cleanups = socialLinksRefs.current.map((ref) => {
      if (ref) {
        return registerMagneticTarget(ref, 'link', 0.3);
      }
      return undefined;
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup?.());
    };
  }, [registerMagneticTarget]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.div
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          GET IN TOUCH
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={styles.title}>Let's Create Something Amazing Together</h2>
            <p className={styles.description}>
              Have a project in mind? I'm always open to discussing new opportunities,
              creative ideas, or potential collaborations.
            </p>

            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <a href="mailto:lexcvillaluz@gmail.com" className={styles.infoValue}>
                  lexcvillaluz@gmail.com
                </a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Social</span>
                <div className={styles.socialLinks}>
                  <a 
                    href="https://github.com/javxdev" 
                    className={styles.socialLink}
                    ref={(el) => { socialLinksRefs.current[0] = el; }}
                    aria-label="GitHub"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/jan-villaluz-81134523a/" 
                    className={styles.socialLink}
                    ref={(el) => { socialLinksRefs.current[1] = el; }}
                    aria-label="LinkedIn"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.formInput}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.formInput}
                placeholder="your.email@example.com"
                autoComplete="email"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={styles.formTextarea}
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              ref={buttonRef}
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
            </motion.button>

            {submitStatus === 'success' && (
              <motion.div
                className={styles.successMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thank you! I'll get back to you soon.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>

      <div className={styles.background}>
        <div className={styles.gradient} />
      </div>
    </section>
  );
};