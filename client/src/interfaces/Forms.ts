export interface WeatherForm {
  WEATHER_API_KEY: string;
  lat: number;
  long: number;
  isCelsius: boolean;
}

export interface SearchForm {
  hideSearch: boolean;
  defaultSearchProvider: string;
  searchSameTab: boolean;
  disableAutofocus: boolean;
}

export interface OtherSettingsForm {
  customTitle: string;
  pinAppsByDefault: boolean;
  pinCategoriesByDefault: boolean;
  hideHeader: boolean;
  hideApps: boolean;
  hideCategories: boolean;
  useOrdering: string;
  appsSameTab: boolean;
  bookmarksSameTab: boolean;
  useAmericanDate: boolean;
  greetingsSchema: string;
  daySchema: string;
  monthSchema: string;
  showTime: boolean;
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
