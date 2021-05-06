import { themes } from './themes.json';
import { Theme } from '../../interfaces/Theme';
import ThemePreview from './ThemePreview';

const Themer = (): JSX.Element => {
  return (
    <div>
      <h1>Themes</h1>
      {themes.map((theme: Theme): JSX.Element => <ThemePreview name={theme.name} colors={theme.colors} />)}
    </div>
  )
}

export default Themer;