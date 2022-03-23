// Redux
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store';

// Components
import { ThemePreview } from '../ThemePreview/ThemePreview';

// Other
import { Theme } from '../../../../interfaces';
import classes from './ThemeGrid.module.css';

interface Props {
  themes: Theme[];
}

export const ThemeGrid = ({ themes }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { setTheme } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className={classes.ThemerGrid}>
      {themes.map(
        (theme: Theme, idx: number): JSX.Element => (
          <ThemePreview key={idx} theme={theme} applyTheme={setTheme} />
        )
      )}
    </div>
  );
};
