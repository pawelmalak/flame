import { Theme } from '../../interfaces/Theme';

const ThemePreview = (theme: Theme): JSX.Element => {
  return (
    <div>
      <p>Theme: {theme.name}</p>
      <p>{theme.colors.background}</p>
    </div>
  )
}

export default ThemePreview;