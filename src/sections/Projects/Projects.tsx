import { useState, useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';

// Data and Types
import { projects } from '../../data/projects';
import { type Project } from '../../data/types';

// Hooks
import { useCursor } from '../../hooks/useCursor';

// Components
import { ProjectModal } from '../../components/ProjectModal/ProjectModal';

// Styles
import styles from './Projects.module.css';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { registerMagneticTarget } = useCursor();

  useEffect(() => {
    const cleanupFns = cardRefs.current
      .filter((ref): ref is HTMLDivElement => ref !== null)
      .map(ref => registerMagneticTarget(ref, 'card', 0.15));

    return () => cleanupFns.forEach(fn => fn());
  }, [registerMagneticTarget]);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  return (
    <>
      <section id="projects" className={styles.projects}>
        <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>
            SELECTED WORK
          </h2>
          <p className={styles.subtitle}>
            A collection of projects that pushed boundaries and delivered impact
          </p>
        </motion.div>

        <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        >
          {projects.map((project, index) => (
            <motion.div
            key={project.id}
            ref={el => {
              cardRefs.current[index] = el;
            }}
            className={styles.card}
            variants={cardVariants}
            onClick={() => setSelectedProject(project)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            >
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.title} className={styles.image} />
              </div>
              
              <div className={styles.content}>
                <h3 className={styles.projectTitle}>
                  {project.title}
                </h3>
                <p className={styles.role}>
                  {project.role}
                </p>
                
                <div className={styles.techStack}>
                  {project.techStack.slice(0, 4).map((tech, techIndex) => (
                    <span key={techIndex} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className={styles.tech}>+{project.techStack.length - 4}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <ProjectModal
      project={selectedProject}
      onClose={() => setSelectedProject(null)}
      />
    </>
  );
};
