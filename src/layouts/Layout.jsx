import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';
import { setChangeTheme } from '@store/modules/themeSlice';
import logoDark from '@assets/images/logo_dark.svg';
import logoLight from '@assets/images/logo_light.svg';

const Layout = () => {
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const onThemeChange = () => dispatch(setChangeTheme());

  return (
    <div className={`${styles.layout} ${styles[mode]}`}>
      <header className={styles.header}>
        <section className={styles.section}>
          <div className={styles.logoContainer}>
            {mode === 'dark' ? (
              <img className={styles.logo} src={logoDark} alt='' />
            ) : (
              <img className={styles.logo} src={logoLight} alt='' />
            )}
          </div>
          <ul className={styles.undefinedContainer}>
            <li className={styles.undefined}>Search</li>
            <li className={styles.undefined} onClick={onThemeChange}>
              Theme
            </li>
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
