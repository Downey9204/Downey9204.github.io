import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Layout.module.scss';
import { setChangeTheme } from '@store/modules/themeSlice';
import { GITHUB_URL } from '@constants/config';
import { AppDispatch, RootState } from '@store/store';
import logoDark from '@assets/images/logo_dark.svg';
import logoLight from '@assets/images/logo_light.svg';
import ContrastIcon from '@mui/icons-material/Contrast';
import GitHubIcon from '@mui/icons-material/GitHub';

const Layout = (): JSX.Element => {
  const { mode } = useSelector((state: RootState) => state.theme);
  const dispatch: AppDispatch = useDispatch();

  const onThemeChange = () => dispatch(setChangeTheme());

  return (
    <div className={`${styles.layout} ${styles[mode]}`}>
      <header className={styles.header}>
        <section className={styles.section}>
          <div className={styles.logoContainer}>
            {mode === 'light' ? (
              <img className={styles.logo} src={logoDark} alt='' />
            ) : (
              <img className={styles.logo} src={logoLight} alt='' />
            )}
          </div>
          <ul className={styles.topBarContainer}>
            <li className={styles.item}>
              <div className={styles.search}>Search</div>
            </li>
            <li className={styles.item}>
              <button className={styles.btn} onClick={onThemeChange}>
                <ContrastIcon className={styles.themeIcon} />
              </button>
            </li>
            <li className={styles.item}>
              <a className={styles.link} href={GITHUB_URL} target='_blank'>
                <GitHubIcon className={styles.githubIcon} />
              </a>
            </li>
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
