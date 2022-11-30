import { Theme } from '../../../../interfaces/Theme';
import { useSetTheme } from '../../../../state/theme';
import classes from './ThemePreview.module.css';

interface Props {
  theme: Theme;
}

export const ThemePreview = ({
  theme: { colors, name },
}: Props): JSX.Element => {
  const setTheme = useSetTheme();

  return (
    <div className={classes.ThemePreview} onClick={() => setTheme(colors)}>
      <div className={classes.ColorsPreview}>
        <div
          className={classes.ColorPreview}
          style={{ backgroundColor: colors.background }}
        ></div>
        <div
          className={classes.ColorPreview}
          style={{ backgroundColor: colors.primary }}
        ></div>
        <div
          className={classes.ColorPreview}
          style={{ backgroundColor: colors.accent }}
        ></div>
      </div>
      <p>{name}</p>
    </div>
  );
};
