import { useEffect } from 'react';

import classes from './Themer.module.css';

import { themes } from './themes.json';
import { Theme } from '../../interfaces/Theme';
import ThemePreview from './ThemePreview';
import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headline/Headline';

const Themer = (): JSX.Element => {
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
    <Container>
      <div>
        <Headline
          title='Themes'
          subtitle='Select new theme by clicking on it'
        />
        <div className={classes.ThemerGrid}>
          {themes.map((theme: Theme): JSX.Element => <ThemePreview theme={theme} applyTheme={applyTheme} />)}
        </div>
      </div>
    </Container>

  )
}

export default Themer;