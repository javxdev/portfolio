import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.divider} />
      
      <div className={styles.footerContent}>
        <div className={styles.copyright}>
          © {currentYear} J.A.V. All rights reserved.
        </div>
      </div>
    </footer>
  );
};