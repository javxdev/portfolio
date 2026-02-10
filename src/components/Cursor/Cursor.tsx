import { motion } from 'framer-motion';
import { useCursor } from '../../hooks/useCursor';
import styles from './Cursor.module.css';

export const Cursor = () => {
  const { x, y, size, opacity } = useCursor();

  return (
    <motion.div
      className={styles.cursor}
      style={{ x, y, opacity }}
      layoutId="cursor"
    >
      <motion.div
        className={styles.lightsaber}
        style={{
          scale: size.get() / 16,
          rotate: -45, // Tilt like arrow
        }}
      >
        <div className={styles.glow} />
        <div className={styles.blade} />
        <div className={styles.hilt} />
      </motion.div>
    </motion.div>
  );
};