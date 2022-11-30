import { Theme } from '../../../../interfaces';
import { ThemePreview } from '../ThemePreview/ThemePreview';
import classes from './ThemeGrid.module.css';

interface Props {
  themes: Theme[];
}

export const ThemeGrid = ({ themes }: Props): JSX.Element => {
  return (
    <div className={classes.ThemerGrid}>
      {themes.map(
        (theme: Theme, idx: number): JSX.Element => (
          <ThemePreview key={idx} theme={theme} />
        )
      )}
    </div>
  );
};
