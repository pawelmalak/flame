export type SettingsNavItem = {
  name: string;
  href: string;
  isAuthRequired?: boolean;
};

export const settingsNavItems: SettingsNavItem[] = [{ name: 'General', href: '/settings/general' }];
