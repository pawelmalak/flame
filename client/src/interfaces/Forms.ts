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
  useOrdering: string;
  openSameTab: number;
}