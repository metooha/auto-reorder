import styles from './PromoBanner.module.css';

export function PromoBanner() {
  return (
    <div className={styles.root}>
      <a
        href="#"
        title="Rollbacks and more. See a red zip up jacket, waffle maker, and Tide laundry detergent."
        aria-label="Shop now - Rollbacks and more"
        className={styles.link}
      >
        <span className={styles.srOnly}>Shop now</span>
      </a>
    </div>
  );
}
