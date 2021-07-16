export interface WeatherForm {
  WEATHER_API_KEY: string;
  lat: number;
  long: number;
  isCelsius: number;
}

export interface SettingsForm {
  customTitle: string;
  pinAppsByDefault: number;
  pinCategoriesByDefault: number;
  hideHeader: number;
  hideApps: number;
  hideCategories: number;
  hideSearch: number;
  defaultSearchProvider: string;
  useOrdering: string;
  appsSameTab: number;
  bookmarksSameTab: number;
  searchSameTab: number;
}
