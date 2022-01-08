import { Config } from '../../interfaces';

export const configTemplate: Config = {
  WEATHER_API_KEY: '',
  lat: 0,
  long: 0,
  isCelsius: true,
  customTitle: 'Flame',
  pinAppsByDefault: true,
  pinCategoriesByDefault: true,
  hideHeader: false,
  useOrdering: 'createdAt',
  appsSameTab: false,
  bookmarksSameTab: false,
  searchSameTab: false,
  hideApps: false,
  hideCategories: false,
  hideSearch: false,
  defaultSearchProvider: 'l',
  autoClearSearch: false,
  dockerApps: false,
  dockerHost: 'localhost',
  kubernetesApps: false,
  unpinStoppedApps: false,
  useAmericanDate: false,
  disableAutofocus: false,
  greetingsSchema: 'Good evening!;Good afternoon!;Good morning!;Good night!',
  daySchema: 'Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday',
  monthSchema:
    'January;February;March;April;May;June;July;August;September;October;November;December',
  showTime: false,
  defaultTheme: 'tron',
  isKilometer: true,
  weatherData: 'cloud',
  hideDate: false,
};
