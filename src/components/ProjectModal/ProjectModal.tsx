import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// Types
import { type Project } from '../../data/types';

// Hooks
import { useCursor } from '../../hooks/useCursor';

// Styles
import styles from './ProjectModal.module.css';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { registerMagneticTarget } = useCursor();

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

  useEffect(() => {
    if (!project) return;
    const modal = modalRef.current;
    if (!modal) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = modal;
      const atTop = scrollTop === 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;

      if (!atTop && !atBottom) {
        e.stopPropagation();
      } else if (scrollHeight > clientHeight) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    modal.addEventListener('wheel', handleWheel, { passive: false });
    return () => modal.removeEventListener('wheel', handleWheel);
  }, [project]);

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
            aria-label="Close Modal"
            >
              <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M14.5 9.5L9.5 14.5M9.5 9.5L14.5 14.5" />
              </svg>
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
                    <span>
                      View Live Project
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                      <path d="M12.9999 21.9994C17.055 21.9921 19.1784 21.8926 20.5354 20.5355C21.9999 19.0711 21.9999 16.714 21.9999 12C21.9999 7.28595 21.9999 4.92893 20.5354 3.46447C19.071 2 16.714 2 11.9999 2C7.28587 2 4.92884 2 3.46438 3.46447C2.10734 4.8215 2.00779 6.94493 2.00049 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> 
                      <path d="M3 21L11 13M11 13H5M11 13V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                    </svg>
                  </a>
                )}
              </div>
            )}
            
            <h2 className={styles.title}>
              {project.title}
            </h2>
            <p className={styles.role}>
              {project.role}
            </p>
            <p className={styles.description}>
              {project.description}
            </p>
            
            <div className={styles.techSection}>
              <h3 className={styles.techTitle}>
                Technologies Used
              </h3>
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