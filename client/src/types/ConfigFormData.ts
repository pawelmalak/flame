import {
  DockerSettingsForm,
  OtherSettingsForm,
  SearchForm,
  ThemeSettingsForm,
  WeatherForm,
} from '../interfaces';

export type ConfigFormData =
  | WeatherForm
  | SearchForm
  | DockerSettingsForm
  | OtherSettingsForm
  | ThemeSettingsForm;
