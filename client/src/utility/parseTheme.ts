import { ThemeColors } from '../interfaces';

// parse theme in PAB (primary;accent;background) format to theme colors object
export const parsePABToTheme = (themeStr: string): ThemeColors => {
  const [primary, accent, background] = themeStr.split(';');

  return {
    primary,
    accent,
    background,
  };
};

export const parseThemeToPAB = ({
  primary: p,
  accent: a,
  background: b,
}: ThemeColors): string => {
  return `${p};${a};${b}`;
};
