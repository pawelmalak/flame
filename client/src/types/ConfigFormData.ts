import {
  DockerSettingsForm,
  OtherSettingsForm,
  GeneralForm,
  ThemeSettingsForm,
  WeatherForm,
} from '../interfaces';

export type ConfigFormData =
  | WeatherForm
  | GeneralForm
  | DockerSettingsForm
  | OtherSettingsForm
  | ThemeSettingsForm;
