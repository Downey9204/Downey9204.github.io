import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <section className={styles.section}>
          <div className={styles.logoContainer}>Logo</div>
          <ul className={styles.undefinedContainer}>
            <li className={styles.undefined}>Search</li>
            <li className={styles.undefined}>Theme</li>
            <li className={styles.undefined}>Github</li>
          </ul>
        </section>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <header className={styles.mainHeader}></header>
          <article className={styles.content}>
            <Outlet />
          </article>
          <aside className={styles.aside}>
            <section className={styles.tags}>Tags</section>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default Layout;
