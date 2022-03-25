import { WeatherData } from '../types';

export interface WeatherForm {
  WEATHER_API_KEY: string;
  lat: number;
  long: number;
  isCelsius: boolean;
  weatherData: WeatherData;
}

export interface GeneralForm {
  defaultSearchProvider: string;
  secondarySearchProvider: string;
  searchSameTab: boolean;
  pinAppsByDefault: boolean;
  pinCategoriesByDefault: boolean;
  useOrdering: string;
  appsSameTab: boolean;
  bookmarksSameTab: boolean;
}

export interface UISettingsForm {
  customTitle: string;
  hideHeader: boolean;
  hideApps: boolean;
  hideCategories: boolean;
  useAmericanDate: boolean;
  greetingsSchema: string;
  daySchema: string;
  monthSchema: string;
  showTime: boolean;
  hideDate: boolean;
  hideSearch: boolean;
  disableAutofocus: boolean;
}

export interface DockerSettingsForm {
  dockerApps: boolean;
  dockerHost: string;
  kubernetesApps: boolean;
  unpinStoppedApps: boolean;
}

export interface ThemeSettingsForm {
  defaultTheme: string;
}
