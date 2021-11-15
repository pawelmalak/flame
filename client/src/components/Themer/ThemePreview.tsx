import { Theme } from '../../interfaces/Theme';
import classes from './ThemePreview.module.css';

interface Props {
  theme: Theme;
  applyTheme: Function;
}

export const ThemePreview = (props: Props): JSX.Element => {
  return (
    <div
      className={classes.ThemePreview}
      onClick={() => props.applyTheme(props.theme.name)}
    >
      <div className={classes.ColorsPreview}>
        <div
          className={classes.ColorPreview}
          style={{ backgroundColor: props.theme.colors.background }}
        ></div>
        <div
          className={classes.ColorPreview}
          style={{ backgroundColor: props.theme.colors.primary }}
        ></div>
        <div
          className={classes.ColorPreview}
          style={{ backgroundColor: props.theme.colors.accent }}
        ></div>
      </div>
      <p>{props.theme.name}</p>
    </div>
  );
};
