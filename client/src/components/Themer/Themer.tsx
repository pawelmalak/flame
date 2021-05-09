import { Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './Themer.module.css';

import { themes } from './themes.json';
import { Theme } from '../../interfaces/Theme';
import ThemePreview from './ThemePreview';

import { setTheme } from '../../store/actions';

interface ComponentProps {
  setTheme: Function;
}

const Themer = (props: ComponentProps): JSX.Element => {

  return (
    <Fragment>
      <div>
        <div className={classes.ThemerGrid}>
          {themes.map((theme: Theme, idx: number): JSX.Element => (
            <ThemePreview
              key={idx}
              theme={theme}
              applyTheme={props.setTheme}
            />
          ))}
        </div>
      </div>
    </Fragment>

  )
}


export default connect(null, { setTheme })(Themer);