import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store';

import classes from './Themer.module.css';

import { themes } from './themes.json';
import { Theme } from '../../interfaces/Theme';
import { ThemePreview } from './ThemePreview';

export const Themer = (): JSX.Element => {
  const dispatch = useDispatch();
  const { setTheme } = bindActionCreators(actionCreators, dispatch);

  return (
    <Fragment>
      <div>
        <div className={classes.ThemerGrid}>
          {themes.map(
            (theme: Theme, idx: number): JSX.Element => (
              <ThemePreview key={idx} theme={theme} applyTheme={setTheme} />
            )
          )}
        </div>
      </div>
    </Fragment>
  );
};
