import { OtherSettingsForm, SearchForm, WeatherForm } from '../../interfaces';

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
  dockerApps: true,
  dockerHost: 'localhost',
  kubernetesApps: true,
  unpinStoppedApps: true,
  useAmericanDate: false,
  greetingsSchema: 'Good evening!;Good afternoon!;Good morning!;Good night!',
};

export const weatherSettingsTemplate: WeatherForm = {
  WEATHER_API_KEY: '',
  lat: 0,
  long: 0,
  isCelsius: true,
};

export const searchSettingsTemplate: SearchForm = {
  hideSearch: false,
  searchSameTab: false,
  defaultSearchProvider: 'l',
  disableAutofocus: false,
};
