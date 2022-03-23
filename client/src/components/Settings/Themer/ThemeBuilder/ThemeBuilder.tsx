import { Theme } from '../../../../interfaces';
import { Button } from '../../../UI';
import { ThemeGrid } from '../ThemeGrid/ThemeGrid';
import classes from './ThemeBuilder.module.css';

interface Props {
  themes: Theme[];
}

export const ThemeBuilder = ({ themes }: Props): JSX.Element => {
  return (
    <div className={classes.ThemeBuilder}>
      <ThemeGrid themes={themes} />

      <div className={classes.Buttons}>
        <Button>Create new theme</Button>
        {themes.length && <Button>Edit user themes</Button>}
      </div>
    </div>
  );
};
