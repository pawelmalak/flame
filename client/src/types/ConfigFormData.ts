import {
  DockerSettingsForm,
  UISettingsForm,
  GeneralForm,
  ThemeSettingsForm,
  WeatherForm,
} from '../interfaces';

export type ConfigFormData =
  | WeatherForm
  | GeneralForm
  | DockerSettingsForm
  | UISettingsForm
  | ThemeSettingsForm;
