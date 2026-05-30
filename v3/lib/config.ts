import { z } from 'zod';

import { DEFAULT_DAYS, DEFAULT_GREETINGS, DEFAULT_MONTHS } from './dateTime';
import { configLog } from './logger';
import type { FixedTuple } from './types';

export {
  DEFAULT_DAYS,
  DEFAULT_GREETINGS,
  DEFAULT_MONTHS,
  type DateTimeConfig,
  type DaysSchema,
  type GreetingConfig,
  type GreetingsSchema,
  type HeaderConfig,
  type MonthsSchema,
} from './dateTime';

const buildStringSchema = <N extends number>(length: N) =>
  z.array(z.string()).length(length) as unknown as z.ZodType<FixedTuple<string, N>>;

const greetingsSchema = buildStringSchema(4);
const daySchema = buildStringSchema(7);
const monthSchema = buildStringSchema(12);

const layoutEnum = z.enum(['stacked', 'tabs']);
const orderingEnum = z.enum(['name', 'createdAt', 'custom']);
const weatherAdditionalDataEnum = z.enum(['humidity', 'cloud', 'wind', 'none']);
const searchPrefixEnum = z.enum(['/', '!']);

const workspaceValidatorSchema = {
  theme: z.string(),
  customTitle: z.string(),
  customCss: z.string(),
  hideHeader: z.boolean(),
  hideGreeting: z.boolean(),
  hideDate: z.boolean(),
  hideTime: z.boolean(),
  hideSearch: z.boolean(),
  hideApps: z.boolean(),
  hideBookmarks: z.boolean(),
  defaultSearchProvider: z.string(),
  localFallbackSearchProvider: z.string(),
  appsLayout: layoutEnum,
  bookmarksLayout: layoutEnum,
  appsOrdering: orderingEnum,
  bookmarksOrdering: orderingEnum,
  openAppsSameTab: z.boolean(),
  openBookmarksSameTab: z.boolean(),
  openSearchSameTab: z.boolean(),
  disableAutofocus: z.boolean(),
  greetingsSchema,
  daySchema,
  monthSchema,
  useAmericanDate: z.boolean(),
  useCelsius: z.boolean(),
  useKilometer: z.boolean(),
  isWeatherWidgetEnabled: z.boolean(),
  showAppsHealthStatus: z.boolean(),
} as const;

const globalOnlyValidatorSchema = {
  searchPrefix: searchPrefixEnum,
  sessionLifetimeDays: z.number().int().positive(),
  weatherApiKey: z.string(),
  weatherLat: z.string(),
  weatherLong: z.string(),
  weatherAdditionalData: weatherAdditionalDataEnum,
  dockerHost: z.string(),
  isDockerIntegrationEnabled: z.boolean(),
  isKubernetesIntegrationEnabled: z.boolean(),
  healthPingInterval: z.number().int().positive(),
  isHealthPingEnabled: z.boolean(),
  defaultTheme: z.string(),
  faviconAutoFetch: z.boolean(),
  showFavicons: z.boolean(),
  versionCheckUrl: z.string(),
  isVersionCheckEnabled: z.boolean(),
} as const;

export const workspaceOverridableSchema = z.object(workspaceValidatorSchema);
export const globalConfigSchema = z.object({
  ...workspaceValidatorSchema,
  ...globalOnlyValidatorSchema,
});

export const workspaceOverridesSchema = workspaceOverridableSchema.partial();
export const globalOverridesSchema = globalConfigSchema.partial();

export type MergedConfig = z.infer<typeof globalConfigSchema>;
export type WorkspaceOverrides = z.infer<typeof workspaceOverridesSchema>;
export type GlobalOverrides = z.infer<typeof globalOverridesSchema>;

export type UnvalidatedConfig = Record<string, unknown>;
export type MutableConfig = Record<string, unknown>;

export type ConfigKey = keyof MergedConfig;
export type WorkspaceOverridableKey = keyof z.infer<typeof workspaceOverridableSchema>;
export type GlobalConfigOnlyKey = Exclude<ConfigKey, WorkspaceOverridableKey>;

const WORKSPACE_OVERRIDABLE_KEYS = new Set<string>(Object.keys(workspaceValidatorSchema));
const GLOBAL_CONFIG_ONLY_KEYS = new Set<string>(Object.keys(globalOnlyValidatorSchema));

export const isWorkspaceOverridableKey = (key: string): key is WorkspaceOverridableKey =>
  WORKSPACE_OVERRIDABLE_KEYS.has(key);

export const isGlobalConfigOnlyKey = (key: string): key is GlobalConfigOnlyKey =>
  GLOBAL_CONFIG_ONLY_KEYS.has(key);

export const CONFIG_DEFAULTS: MergedConfig = {
  theme: 'tron',
  customTitle: 'Flame',
  customCss: '',
  hideHeader: false,
  hideGreeting: false,
  hideDate: false,
  hideTime: false,
  hideSearch: false,
  hideApps: false,
  hideBookmarks: false,
  defaultSearchProvider: 'l',
  localFallbackSearchProvider: 'g',
  appsLayout: 'stacked',
  bookmarksLayout: 'stacked',
  appsOrdering: 'name',
  bookmarksOrdering: 'name',
  openAppsSameTab: false,
  openBookmarksSameTab: false,
  openSearchSameTab: false,
  disableAutofocus: false,
  greetingsSchema: [...DEFAULT_GREETINGS] as FixedTuple<string, 4>,
  daySchema: [...DEFAULT_DAYS] as FixedTuple<string, 7>,
  monthSchema: [...DEFAULT_MONTHS] as FixedTuple<string, 12>,
  useAmericanDate: false,
  useCelsius: true,
  useKilometer: true,
  isWeatherWidgetEnabled: true,
  showAppsHealthStatus: false,
  searchPrefix: '/',
  sessionLifetimeDays: 30,
  weatherApiKey: '',
  weatherLat: '',
  weatherLong: '',
  weatherAdditionalData: 'humidity',
  dockerHost: 'unix:///var/run/docker.sock',
  isDockerIntegrationEnabled: false,
  isKubernetesIntegrationEnabled: false,
  healthPingInterval: 30,
  isHealthPingEnabled: false,
  defaultTheme: 'tron',
  faviconAutoFetch: true,
  showFavicons: true,
  versionCheckUrl: '',
  isVersionCheckEnabled: true,
};

type EnvOverride = {
  envVar: string;
  parse: (rawValue: string) => unknown;
};

const ENV_OVERRIDES: Partial<Record<GlobalConfigOnlyKey, EnvOverride>> = {
  sessionLifetimeDays: {
    envVar: 'SESSION_DAYS',
    parse: rawValue => Number.parseInt(rawValue),
  },
  versionCheckUrl: { envVar: 'VERSION_CHECK_URL', parse: rawValue => rawValue },
};

const getEnvOverrideEntries = (): [GlobalConfigOnlyKey, EnvOverride][] =>
  Object.entries(ENV_OVERRIDES) as [GlobalConfigOnlyKey, EnvOverride][];

const getEnvValue = (envVar: string): string | undefined => {
  const rawValue = process.env[envVar];
  return rawValue !== undefined && rawValue.length > 0 ? rawValue : undefined;
};

export const getKeysLockedByEnv = (): Set<GlobalConfigOnlyKey> => {
  return getEnvOverrideEntries().reduce<Set<GlobalConfigOnlyKey>>((keys, [key, { envVar }]) => {
    if (getEnvValue(envVar)) {
      keys.add(key);
    }

    return keys;
  }, new Set());
};

const applyEnvOverrides = (config: MergedConfig): MergedConfig =>
  getEnvOverrideEntries().reduce<MergedConfig>(
    (configWithEnvOverrides, [key, { envVar, parse }]) => {
      const rawEnvValue = getEnvValue(envVar);

      if (!rawEnvValue) {
        return configWithEnvOverrides;
      }

      let parsedEnvValue: unknown;

      try {
        parsedEnvValue = parse(rawEnvValue);
      } catch {
        configLog.warn({ envVar }, 'env override failed to parse; ignoring');

        return configWithEnvOverrides;
      }

      const envValueValidationResult = globalOverridesSchema.safeParse({ [key]: parsedEnvValue });

      if (!envValueValidationResult.success) {
        configLog.warn({ envVar }, 'env override failed schema validation; ignoring');

        return configWithEnvOverrides;
      }

      (configWithEnvOverrides as MutableConfig)[key] = parsedEnvValue;

      return configWithEnvOverrides;
    },
    { ...config },
  );

const dropInvalidConfigKeys = <T extends z.ZodTypeAny>(
  configLayerData: UnvalidatedConfig,
  schema: T,
  configLayerType: 'global' | 'workspace',
): z.infer<T> => {
  const layerValidationResult = schema.safeParse(configLayerData);

  if (layerValidationResult.success) {
    return layerValidationResult.data;
  }

  configLog.warn(
    {
      configLayerType,
      issues: layerValidationResult.error.issues.map(({ path, code }) => ({
        path,
        code,
      })),
    },
    'config layer validation failed; retaining subset of only valid keys',
  );

  const validKeysSubset = Object.entries(configLayerData).reduce<MutableConfig>(
    (subset, [key, value]) => {
      const fieldValidationResult = schema.safeParse({ [key]: value });

      if (fieldValidationResult.success) {
        const validatedField = fieldValidationResult.data as MutableConfig;

        if (key in validatedField) {
          subset[key] = validatedField[key];
        }
      } else {
        configLog.warn({ configLayerType, key }, 'discarding invalid config field');
      }

      return subset;
    },
    {},
  );

  return validKeysSubset as z.infer<T>;
};

export type BuildMergedConfigInput = {
  globalConfig: UnvalidatedConfig;
  workspaceOverrides?: UnvalidatedConfig | null;
};

export const buildMergedConfig = ({
  globalConfig,
  workspaceOverrides,
}: BuildMergedConfigInput): MergedConfig => {
  const validGlobalKeys = dropInvalidConfigKeys(globalConfig, globalOverridesSchema, 'global');
  const validWorkspaceKeys =
    workspaceOverrides == null
      ? {}
      : dropInvalidConfigKeys(workspaceOverrides, workspaceOverridesSchema, 'workspace');

  const mergedConfig: MergedConfig = {
    ...CONFIG_DEFAULTS,
    ...validGlobalKeys,
    ...validWorkspaceKeys,
  };

  const globalCss = typeof validGlobalKeys.customCss === 'string' ? validGlobalKeys.customCss : '';
  const workspaceCss =
    typeof validWorkspaceKeys.customCss === 'string' ? validWorkspaceKeys.customCss : '';

  mergedConfig.customCss = [globalCss, workspaceCss].filter(css => css.length > 0).join('\n');

  return applyEnvOverrides(mergedConfig);
};
