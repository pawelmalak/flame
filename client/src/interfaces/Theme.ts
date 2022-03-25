export interface ThemeColors {
  background: string;
  primary: string;
  accent: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  isCustom: boolean;
}
