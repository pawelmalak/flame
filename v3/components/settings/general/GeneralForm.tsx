'use client';

import { useState, type SyntheticEvent } from 'react';

import { updateGlobalConfig } from '@/app/settings/general/actions';
import { BooleanField } from '@/components/settings/BooleanField';
import { SelectField } from '@/components/settings/SelectField';
import { SettingsHeadline } from '@/components/settings/SettingsHeadline';
import { TextField } from '@/components/settings/TextField';
import { useToast } from '@/components/toast/ToastProvider';
import { Button } from '@/components/ui/Button';
import type { MergedConfig, GlobalConfigOnlyKey, UnvalidatedConfig } from '@/lib/config';
import { useFormStateUpdater } from '@/hooks/useFormStateUpdater';

type Props = {
  initialConfig: MergedConfig;
  envLockedKeys: GlobalConfigOnlyKey[];
};

type StringifiedConfigKeys = keyof Pick<
  MergedConfig,
  'sessionLifetimeDays' | 'healthPingInterval' | 'greetingsSchema' | 'daySchema' | 'monthSchema'
>;

type FormState = Omit<MergedConfig, StringifiedConfigKeys> & Record<StringifiedConfigKeys, string>;

const LIST_DELIMITER = ';';

const joinStringSchemaKey = (values: readonly string[]): string => values.join(LIST_DELIMITER);

const splitStringSchemaKey = (raw: string): string[] =>
  raw
    .split(LIST_DELIMITER)
    .map(part => part.trim())
    .filter(part => part.length > 0);

const buildInitialState = ({
  sessionLifetimeDays,
  healthPingInterval,
  greetingsSchema,
  daySchema,
  monthSchema,
  ...config
}: MergedConfig): FormState => ({
  ...config,
  sessionLifetimeDays: String(sessionLifetimeDays),
  healthPingInterval: String(healthPingInterval),
  greetingsSchema: joinStringSchemaKey(greetingsSchema),
  daySchema: joinStringSchemaKey(daySchema),
  monthSchema: joinStringSchemaKey(monthSchema),
});

const EXPECTED_STRING_SCHEMA_LENGTHS: Record<
  'greetingsSchema' | 'daySchema' | 'monthSchema',
  number
> = {
  greetingsSchema: 4,
  daySchema: 7,
  monthSchema: 12,
};

export const GeneralForm = ({ initialConfig, envLockedKeys }: Props) => {
  const [formState, setFormState] = useState<FormState>(() => buildInitialState(initialConfig));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const updateState = useFormStateUpdater(setFormState);

  const buildConfigUpdatePayload = ():
    | { success: true; payload: UnvalidatedConfig }
    | { success: false; error: string } => {
    const {
      sessionLifetimeDays,
      healthPingInterval,
      greetingsSchema,
      daySchema,
      monthSchema,
      ...configRest
    } = formState;

    const payload: UnvalidatedConfig = { ...configRest };

    for (const lockedKey of envLockedKeys) {
      delete payload[lockedKey];
    }

    if (!envLockedKeys.includes('sessionLifetimeDays')) {
      const parsedSessionLifetimeDays = parseInt(sessionLifetimeDays);

      if (!isFinite(parsedSessionLifetimeDays) || parsedSessionLifetimeDays <= 0) {
        return { success: false, error: 'Session lifetime must be a positive integer' };
      }

      payload.sessionLifetimeDays = parsedSessionLifetimeDays;
    }

    const parsedHealthPingInterval = parseInt(healthPingInterval);

    if (!isFinite(parsedHealthPingInterval) || parsedHealthPingInterval <= 0) {
      return { success: false, error: 'Health ping interval must be a positive integer' };
    }

    payload.healthPingInterval = parsedHealthPingInterval;

    const stringSchemaConfigKeys = { greetingsSchema, daySchema, monthSchema };

    for (const [key, expectedLength] of Object.entries(EXPECTED_STRING_SCHEMA_LENGTHS) as [
      keyof typeof stringSchemaConfigKeys,
      number,
    ][]) {
      const schemaValues = splitStringSchemaKey(stringSchemaConfigKeys[key]);

      if (schemaValues.length !== expectedLength) {
        return {
          success: false,
          error: `${key} must contain exactly ${expectedLength} values separated by ${LIST_DELIMITER}`,
        };
      }

      payload[key] = schemaValues;
    }

    return { success: true, payload };
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const buildResult = buildConfigUpdatePayload();

    if (!buildResult.success) {
      toast.error(buildResult.error);

      return;
    }

    setIsSubmitting(true);

    try {
      const { success, message } = await updateGlobalConfig(buildResult.payload);

      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SettingsHeadline>Search</SettingsHeadline>

      <SelectField
        id="searchPrefix"
        label="Search prefix"
        value={formState.searchPrefix}
        onChange={updateState('searchPrefix')}
        options={[
          { value: '/', label: '/ (slash)' },
          { value: '!', label: '! (bang)' },
        ]}
        disabled={isSubmitting}
      />

      <SettingsHeadline>Header</SettingsHeadline>

      <TextField
        id="greetingsSchema"
        label="Custom greetings"
        value={formState.greetingsSchema}
        onChange={updateState('greetingsSchema')}
        placeholder="Good evening!;Good afternoon!;Good morning!;Good night!"
        hint="Four values separated by semicolon (evening, afternoon, morning, night)."
        disabled={isSubmitting}
      />

      <TextField
        id="daySchema"
        label="Custom weekday names"
        value={formState.daySchema}
        onChange={updateState('daySchema')}
        placeholder="Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday"
        hint="Seven values separated by semicolon, starting with Sunday."
        disabled={isSubmitting}
      />

      <TextField
        id="monthSchema"
        label="Custom month names"
        value={formState.monthSchema}
        onChange={updateState('monthSchema')}
        placeholder="January;February;March;..."
        hint="Twelve values separated by semicolon."
        disabled={isSubmitting}
      />

      <SettingsHeadline>Favicons</SettingsHeadline>

      <BooleanField
        id="faviconAutoFetch"
        label="Auto-fetch favicons for new bookmarks"
        value={formState.faviconAutoFetch}
        onChange={updateState('faviconAutoFetch')}
        disabled={isSubmitting}
      />

      <BooleanField
        id="showFavicons"
        label="Show auto-fetched favicons"
        value={formState.showFavicons}
        onChange={updateState('showFavicons')}
        disabled={isSubmitting}
      />

      <SettingsHeadline>App health</SettingsHeadline>

      <BooleanField
        id="isHealthPingEnabled"
        label="Enable health pings"
        value={formState.isHealthPingEnabled}
        onChange={updateState('isHealthPingEnabled')}
        disabled={isSubmitting}
      />

      <TextField
        id="healthPingInterval"
        label="Health ping interval (seconds)"
        type="number"
        min={1}
        value={formState.healthPingInterval}
        onChange={updateState('healthPingInterval')}
        disabled={isSubmitting}
      />

      <SettingsHeadline>Version check</SettingsHeadline>

      <BooleanField
        id="isVersionCheckEnabled"
        label="Enable version check"
        value={formState.isVersionCheckEnabled}
        onChange={updateState('isVersionCheckEnabled')}
        disabled={isSubmitting}
      />

      <TextField
        id="versionCheckUrl"
        label="Version check URL"
        value={formState.versionCheckUrl}
        onChange={updateState('versionCheckUrl')}
        isLockedByEnv={envLockedKeys.includes('versionCheckUrl')}
        disabled={isSubmitting}
      />

      <SettingsHeadline>Sessions</SettingsHeadline>

      <TextField
        id="sessionLifetimeDays"
        label="Session lifetime (days)"
        type="number"
        min={1}
        value={formState.sessionLifetimeDays}
        onChange={updateState('sessionLifetimeDays')}
        isLockedByEnv={envLockedKeys.includes('sessionLifetimeDays')}
        disabled={isSubmitting}
      />

      <Button type="submit" disabled={isSubmitting}>
        Save changes
      </Button>
    </form>
  );
};
