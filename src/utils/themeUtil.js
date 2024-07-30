import { INIT_THEME } from '@constants/config';

export const initThemeMode = () => {
  const curTheme = sessionStorage.getItem('theme');

  if (curTheme) {
    return curTheme;
  } else {
    sessionStorage.setItem('theme', INIT_THEME);

    return INIT_THEME;
  }
};

export const changeThemeMode = (mode) => {
  sessionStorage.setItem('theme', mode);
};
