import {
  DockerSettingsForm,
  OtherSettingsForm,
  SearchForm,
  ThemeSettingsForm,
  WeatherForm,
} from '../../interfaces';

export const otherSettingsTemplate: OtherSettingsForm = {
  customTitle: document.title,
  pinAppsByDefault: true,
  pinCategoriesByDefault: true,
  hideHeader: false,
  hideApps: false,
  hideCategories: false,
  useOrdering: 'createdAt',
  appsSameTab: false,
  bookmarksSameTab: false,
  useAmericanDate: false,
  greetingsSchema: 'Good evening!;Good afternoon!;Good morning!;Good night!',
  daySchema: 'Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday',
  monthSchema:
    'January;February;March;April;May;June;July;August;September;October;November;December',
  showTime: false,
  hideDate: false,
};

export const weatherSettingsTemplate: WeatherForm = {
  WEATHER_API_KEY: '',
  lat: 0,
  long: 0,
  isCelsius: true,
  weatherData: 'cloud',
};

export const searchSettingsTemplate: SearchForm = {
  hideSearch: false,
  searchSameTab: false,
  defaultSearchProvider: 'l',
  disableAutofocus: false,
  autoClearSearch: false,
};

export const dockerSettingsTemplate: DockerSettingsForm = {
  dockerApps: true,
  dockerHost: 'localhost',
  kubernetesApps: true,
  unpinStoppedApps: true,
};

export const themeSettingsTemplate: ThemeSettingsForm = {
  defaultTheme: 'tron',
};
