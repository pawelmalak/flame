import { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './Themer.module.css';

import { themes } from './themes.json';
import { Theme } from '../../interfaces/Theme';
import ThemePreview from './ThemePreview';
import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headline/Headline';

import { setTheme } from '../../store/actions';

interface ComponentProps {
  setTheme: Function;
}

const Themer = (props: ComponentProps): JSX.Element => {
  useEffect((): void => {
    if (localStorage.theme) {
      applyTheme(localStorage.theme);
    }
  }, []);

  const applyTheme = (themeName: string): void => {
    const newTheme = themes.find((theme: Theme) => theme.name === themeName);
    
    if (newTheme) {
      for (const [key, value] of Object.entries(newTheme.colors)) {
        document.body.style.setProperty(`--color-${key}`, value);
      }
      localStorage.setItem('theme', themeName);
    }
  }

  return (
    <Fragment>
      <div>
        {/* <Headline
          title='Themes'
          subtitle='Select new theme by clicking on it'
        /> */}
        <div className={classes.ThemerGrid}>
          {themes.map((theme: Theme): JSX.Element => <ThemePreview theme={theme} applyTheme={props.setTheme} />)}
        </div>
      </div>
    </Fragment>

  )
}


export default connect(null, { setTheme })(Themer);