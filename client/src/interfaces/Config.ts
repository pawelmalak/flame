import { WeatherData } from '../types';

export interface Config {
  WEATHER_API_KEY: string;
  lat: number;
  long: number;
  isCelsius: boolean;
  customTitle: string;
  pinAppsByDefault: boolean;
  pinCategoriesByDefault: boolean;
  hideHeader: boolean;
  useOrdering: string;
  appsSameTab: boolean;
  bookmarksSameTab: boolean;
  searchSameTab: boolean;
  hideApps: boolean;
  hideCategories: boolean;
  hideSearch: boolean;
  defaultSearchProvider: string;
  secondarySearchProvider: string;
  dockerApps: boolean;
  dockerHost: string;
  kubernetesApps: boolean;
  unpinStoppedApps: boolean;
  useAmericanDate: boolean;
  disableAutofocus: boolean;
  greetingsSchema: string;
  daySchema: string;
  monthSchema: string;
  showTime: boolean;
  defaultTheme: string;
  isKilometer: boolean;
  weatherData: WeatherData;
  hideDate: boolean;
}
