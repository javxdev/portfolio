import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { type Project } from '../../data/types';
import { useCursor } from '../../hooks/useCursor';
import styles from './ProjectModal.module.css';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { registerMagneticTarget } = useCursor();

  // Handle Escape key + body scroll lock
  useEffect(() => {
    if (!project) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  // Prevent wheel events from bubbling to the parent section
  useEffect(() => {
    if (!project) return;
    const modal = modalRef.current;
    if (!modal) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = modal;
      const atTop = scrollTop === 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;

      // Only stop propagation if there's actually overflow to scroll
      if (!atTop && !atBottom) {
        e.stopPropagation();
      } else if (scrollHeight > clientHeight) {
        // At boundary but modal is scrollable — still prevent parent scroll
        e.stopPropagation();
        e.preventDefault();
      }
    };

    modal.addEventListener('wheel', handleWheel, { passive: false });
    return () => modal.removeEventListener('wheel', handleWheel);
  }, [project]);

  // Register close button as magnetic target
  useEffect(() => {
    if (project && closeButtonRef.current) {
      return registerMagneticTarget(closeButtonRef.current, 'button', 0.5);
    }
  }, [project, registerMagneticTarget]);

  if (!project) return null;

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            className={styles.modal}
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>

            {project.images?.length && (
              <div className={styles.imageGallery}>
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className={styles.mainImage}
                />
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.liveButton}
                  >
                    <span>View Live Project</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 18L8.5 15.5M18 6H9M18 6V15M18 6L11.5 12.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
              </div>
            )}

            <h2 className={styles.title}>{project.title}</h2>
            <p className={styles.role}>{project.role}</p>
            <p className={styles.description}>{project.description}</p>

            <div className={styles.techSection}>
              <h3 className={styles.techTitle}>Technologies Used</h3>
              <div className={styles.techList}>
                {project.techStack.map((tech, index) => (
                  <span key={index} className={styles.tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};