import { beforeEach, describe, expect, it } from 'vitest';

import {
  DEFAULT_DAYS,
  DEFAULT_GREETINGS,
  DEFAULT_MONTHS,
  CONFIG_DEFAULTS,
  getKeysLockedByEnv,
  globalOverridesSchema,
  buildMergedConfig,
  workspaceOverridesSchema,
  type UnvalidatedConfig,
} from '@/lib/config';
import { validateConfigUpdate } from '@/lib/config-validateUpdate';
import { setupEnvSandbox } from '../helpers/envSandbox';

const { setEnv } = setupEnvSandbox(['SESSION_DAYS', 'VERSION_CHECK_URL'] as const);

beforeEach(() => {
  setEnv('SESSION_DAYS', undefined);
  setEnv('VERSION_CHECK_URL', undefined);
});

describe('buildMergedConfig', () => {
  it('returns schema defaults when both layers are empty', () => {
    const mergedConfig = buildMergedConfig({ globalConfig: {} });

    expect(mergedConfig.theme).toBe('tron');
    expect(mergedConfig.customTitle).toBe('Flame');
    expect(mergedConfig.searchPrefix).toBe('/');
    expect(mergedConfig.greetingsSchema).toEqual([...DEFAULT_GREETINGS]);
    expect(mergedConfig.daySchema).toEqual([...DEFAULT_DAYS]);
    expect(mergedConfig.monthSchema).toEqual([...DEFAULT_MONTHS]);
    expect(mergedConfig.sessionLifetimeDays).toBe(30);
    expect(mergedConfig.isHealthPingEnabled).toBe(false);
  });

  it('overrides defaults with global config', () => {
    const mergedConfig = buildMergedConfig({
      globalConfig: { theme: 'paper', isHealthPingEnabled: true, healthPingInterval: 60 },
    });

    expect(mergedConfig.theme).toBe('paper');
    expect(mergedConfig.isHealthPingEnabled).toBe(true);
    expect(mergedConfig.healthPingInterval).toBe(60);
    expect(mergedConfig.customTitle).toBe('Flame');
  });

  it('overrides global with workspace overrides', () => {
    const mergedConfig = buildMergedConfig({
      globalConfig: { theme: 'paper', hideApps: false },
      workspaceOverrides: { theme: 'nord', hideApps: true },
    });

    expect(mergedConfig.theme).toBe('nord');
    expect(mergedConfig.hideApps).toBe(true);
  });

  it('workspace cannot override global-only keys', () => {
    const mergedConfig = buildMergedConfig({
      globalConfig: { searchPrefix: '/' },
      workspaceOverrides: { searchPrefix: '!', isHealthPingEnabled: true },
    });

    expect(mergedConfig.searchPrefix).toBe('/');
    expect(mergedConfig.isHealthPingEnabled).toBe(false);
  });

  it('null workspaceOverrides behaves like no overrides', () => {
    const withNullOverrides = buildMergedConfig({
      globalConfig: { theme: 'nord' },
      workspaceOverrides: null,
    });
    const withoutOverrides = buildMergedConfig({ globalConfig: { theme: 'nord' } });

    expect(withNullOverrides).toEqual(withoutOverrides);
  });

  it('drops unknown global keys without throwing', () => {
    const mergedConfig = buildMergedConfig({
      globalConfig: { theme: 'nord', futureKey: 'whatever' },
    });

    expect(mergedConfig.theme).toBe('nord');
    expect('futureKey' in mergedConfig).toBe(false);
  });

  it('keeps the valid subset when a global field has the wrong type', () => {
    const mergedConfig = buildMergedConfig({
      globalConfig: { theme: 'nord', healthPingInterval: 'oops' as unknown as number },
    });

    expect(mergedConfig.theme).toBe('nord');
    expect(mergedConfig.healthPingInterval).toBe(30);
  });

  it('preserves list-shaped keys when provided as arrays of correct length', () => {
    const greetings = ['Eve', 'Aft', 'Morn', 'Night'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const mergedConfig = buildMergedConfig({
      globalConfig: { greetingsSchema: greetings, daySchema: days },
    });

    expect(mergedConfig.greetingsSchema).toEqual(greetings);
    expect(mergedConfig.daySchema).toEqual(days);
  });

  it('falls back to default when a list key has the wrong number of values', () => {
    const mergedConfig = buildMergedConfig({
      globalConfig: { greetingsSchema: ['only', 'three', 'values'] },
    });

    expect(mergedConfig.greetingsSchema).toEqual([...DEFAULT_GREETINGS]);
  });
});

describe('buildMergedConfig - customCss additive concatenation', () => {
  it('concatenates global + workspace CSS with a newline', () => {
    const mergedConfig = buildMergedConfig({
      globalConfig: { customCss: '.global { color: red; }' },
      workspaceOverrides: { customCss: '.workspace { color: blue; }' },
    });

    expect(mergedConfig.customCss).toBe('.global { color: red; }\n.workspace { color: blue; }');
  });

  it('uses global only when workspace CSS is empty', () => {
    const mergedConfig = buildMergedConfig({
      globalConfig: { customCss: '.only-global {}' },
      workspaceOverrides: { customCss: '' },
    });

    expect(mergedConfig.customCss).toBe('.only-global {}');
  });

  it('uses workspace only when global CSS is empty', () => {
    const mergedConfig = buildMergedConfig({
      globalConfig: {},
      workspaceOverrides: { customCss: '.only-ws {}' },
    });

    expect(mergedConfig.customCss).toBe('.only-ws {}');
  });

  it('returns empty string when neither layer provides CSS', () => {
    expect(buildMergedConfig({ globalConfig: {} }).customCss).toBe('');
  });
});

describe('getKeysLockedByEnv', () => {
  it('returns an empty set when no env vars are set', () => {
    expect(getKeysLockedByEnv().size).toBe(0);
  });

  it('reports sessionLifetimeDays as locked when SESSION_DAYS is set', () => {
    setEnv('SESSION_DAYS', '14');

    expect(getKeysLockedByEnv().has('sessionLifetimeDays')).toBe(true);
  });

  it('does not report locked for an empty env value', () => {
    setEnv('SESSION_DAYS', '');

    expect(getKeysLockedByEnv().has('sessionLifetimeDays')).toBe(false);
  });
});

describe('buildMergedConfig - env overrides', () => {
  it('overrides the stored sessionLifetimeDays with SESSION_DAYS env', () => {
    setEnv('SESSION_DAYS', '14');

    const mergedConfig = buildMergedConfig({ globalConfig: { sessionLifetimeDays: 999 } });

    expect(mergedConfig.sessionLifetimeDays).toBe(14);
  });

  it('falls back to schema default when SESSION_DAYS is unparseable', () => {
    setEnv('SESSION_DAYS', 'not-a-number');

    const mergedConfig = buildMergedConfig({ globalConfig: { sessionLifetimeDays: 45 } });

    expect(mergedConfig.sessionLifetimeDays).toBe(45);
  });
});

describe('globalConfigSchema (Zod validation)', () => {
  it('CONFIG_DEFAULTS exposes a full default config', () => {
    expect(CONFIG_DEFAULTS.theme).toBe('tron');
    expect(CONFIG_DEFAULTS.searchPrefix).toBe('/');
    expect(CONFIG_DEFAULTS.greetingsSchema).toHaveLength(4);
    expect(CONFIG_DEFAULTS.daySchema).toHaveLength(7);
    expect(CONFIG_DEFAULTS.monthSchema).toHaveLength(12);
  });

  it('rejects a greetingsSchema with fewer than 4 elements', () => {
    const validation = globalOverridesSchema.safeParse({ greetingsSchema: ['a', 'b', 'c'] });

    expect(validation.success).toBe(false);
  });

  it('rejects a greetingsSchema with more than 4 elements', () => {
    const validation = globalOverridesSchema.safeParse({
      greetingsSchema: ['a', 'b', 'c', 'd', 'e'],
    });

    expect(validation.success).toBe(false);
  });

  it('rejects a daySchema with fewer than 7 elements', () => {
    const validation = globalOverridesSchema.safeParse({
      daySchema: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    });

    expect(validation.success).toBe(false);
  });

  it('rejects a monthSchema with fewer than 12 elements', () => {
    const validation = globalOverridesSchema.safeParse({
      monthSchema: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    });

    expect(validation.success).toBe(false);
  });

  it('rejects searchPrefix outside the allowed set', () => {
    const validation = globalOverridesSchema.safeParse({ searchPrefix: '?' });

    expect(validation.success).toBe(false);
  });

  it('rejects negative sessionLifetimeDays', () => {
    expect(globalOverridesSchema.safeParse({ sessionLifetimeDays: -1 }).success).toBe(false);
    expect(globalOverridesSchema.safeParse({ sessionLifetimeDays: 0 }).success).toBe(false);
  });

  it('rejects non-integer healthPingInterval', () => {
    expect(globalOverridesSchema.safeParse({ healthPingInterval: 1.5 }).success).toBe(false);
  });

  it('rejects bad enum values for appsLayout', () => {
    expect(workspaceOverridesSchema.safeParse({ appsLayout: 'grid' }).success).toBe(false);
  });

  it('accepts a partial global update', () => {
    const validation = globalOverridesSchema.safeParse({
      theme: 'nord',
      isHealthPingEnabled: true,
      healthPingInterval: 45,
    });

    expect(validation.success).toBe(true);
  });
});

describe('validateConfigUpdate (global schema)', () => {
  const buildGlobalUpdateCall = (updatedConfigKeys: unknown, currentConfig: UnvalidatedConfig) =>
    validateConfigUpdate({
      updatedConfigKeys,
      currentConfig,
      schema: globalOverridesSchema,
    });

  it('rejects non-object input', () => {
    expect(buildGlobalUpdateCall(null, {}).success).toBe(false);
    expect(buildGlobalUpdateCall('string', {}).success).toBe(false);
    expect(buildGlobalUpdateCall([], {}).success).toBe(false);
    expect(buildGlobalUpdateCall(42, {}).success).toBe(false);
  });

  it('rejects when any field fails Zod validation', () => {
    const updateResult = buildGlobalUpdateCall({ healthPingInterval: -5 }, {});

    expect(updateResult.success).toBe(false);
  });

  it('merges a partial update into existing config', () => {
    const updateResult = buildGlobalUpdateCall({ theme: 'nord' }, { customTitle: 'Old' });

    expect(updateResult.success).toBe(true);

    if (updateResult.success) {
      expect(updateResult.newConfig).toEqual({ customTitle: 'Old', theme: 'nord' });
    }
  });

  it('strips env-locked keys before writing', () => {
    setEnv('SESSION_DAYS', '14');

    const updateResult = buildGlobalUpdateCall(
      { theme: 'nord', sessionLifetimeDays: 99 },
      { existing: 'value' },
    );

    expect(updateResult.success).toBe(true);

    if (updateResult.success) {
      expect(updateResult.newConfig).toEqual({ existing: 'value', theme: 'nord' });
      expect('sessionLifetimeDays' in updateResult.newConfig).toBe(false);
    }
  });

  it('preserves valid tuple values for greetings/day/month schemas', () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const updateResult = buildGlobalUpdateCall({ daySchema: days }, {});

    expect(updateResult.success).toBe(true);

    if (updateResult.success) {
      expect(updateResult.newConfig.daySchema).toEqual(days);
    }
  });

  it('rejects a daySchema with the wrong number of values', () => {
    const updateResult = buildGlobalUpdateCall(
      { daySchema: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
      {},
    );

    expect(updateResult.success).toBe(false);
  });
});
