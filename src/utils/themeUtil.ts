import { INIT_THEME } from '@constants/config';

export const initThemeMode = (): 'light' | 'dark' => {
  const curTheme = sessionStorage.getItem('theme');

  if (curTheme === 'light' || curTheme === 'dark') {
    return curTheme;
  } else {
    sessionStorage.setItem('theme', INIT_THEME);

    return INIT_THEME;
  }
};

export const changeThemeMode = (mode: 'light' | 'dark') => {
  sessionStorage.setItem('theme', mode);
};
