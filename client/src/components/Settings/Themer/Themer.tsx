import { useAtomValue } from 'jotai';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Theme, ThemeSettingsForm } from '../../../interfaces';
import { authAtom } from '../../../state/auth';
import {
  configAtom,
  configLoadingAtom,
  useUpdateConfig,
} from '../../../state/config';
import { themesAtom, userThemesAtom } from '../../../state/theme';
import {
  inputHandler,
  parseThemeToPAB,
  themeSettingsTemplate,
} from '../../../utility';
import { Button, InputGroup, SettingsHeadline, Spinner } from '../../UI';
import { ThemeBuilder } from './ThemeBuilder/ThemeBuilder';
import { ThemeGrid } from './ThemeGrid/ThemeGrid';

export const Themer = (): JSX.Element => {
  const { isAuthenticated } = useAtomValue(authAtom);

  const themes = useAtomValue(themesAtom);
  const userThemes = useAtomValue(userThemesAtom);

  const loading = useAtomValue(configLoadingAtom);
  const config = useAtomValue(configAtom);
  const updateConfig = useUpdateConfig();

  // Initial state
  const [formData, setFormData] = useState<ThemeSettingsForm>(
    themeSettingsTemplate
  );

  // Get config
  useEffect(() => setFormData({ ...config }), [loading]);

  // Form handler
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // Save settings
    await updateConfig({ ...formData });
  };

  // Input handler
  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    options?: { isNumber?: boolean; isBool?: boolean }
  ) => {
    inputHandler<ThemeSettingsForm>({
      e,
      options,
      setStateHandler: setFormData,
      state: formData,
    });
  };

  const customThemesEl = (
    <>
      <SettingsHeadline text="User themes" />
      <ThemeBuilder themes={userThemes} />
    </>
  );

  return (
    <>
      <SettingsHeadline text="App themes" />
      {!themes.length ? <Spinner /> : <ThemeGrid themes={themes} />}

      {!userThemes.length ? isAuthenticated && customThemesEl : customThemesEl}

      {isAuthenticated && (
        <form onSubmit={formSubmitHandler}>
          <SettingsHeadline text="Other settings" />
          <InputGroup>
            <label htmlFor="defaultTheme">Default theme for new users</label>
            <select
              id="defaultTheme"
              name="defaultTheme"
              value={formData.defaultTheme}
              onChange={(e) => inputChangeHandler(e)}
            >
              {[...themes, ...userThemes].map((theme: Theme, idx) => (
                <option key={idx} value={parseThemeToPAB(theme.colors)}>
                  {theme.isCustom && '+'} {theme.name}
                </option>
              ))}
            </select>
          </InputGroup>

          <Button>Save changes</Button>
        </form>
      )}
    </>
  );
};
