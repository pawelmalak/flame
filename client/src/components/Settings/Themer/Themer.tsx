import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';

// Typescript
import { Theme, ThemeSettingsForm } from '../../../interfaces';

// Components
import { ThemePreview } from './ThemePreview';
import { Button, InputGroup, SettingsHeadline } from '../../UI';

// Other
import classes from './Themer.module.css';
import { themes } from './themes.json';
import { State } from '../../../store/reducers';
import { inputHandler, themeSettingsTemplate } from '../../../utility';

export const Themer = (): JSX.Element => {
  const {
    auth: { isAuthenticated },
    config: { loading, config },
  } = useSelector((state: State) => state);

  const dispatch = useDispatch();
  const { setTheme, updateConfig } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // Initial state
  const [formData, setFormData] = useState<ThemeSettingsForm>(
    themeSettingsTemplate
  );

  // Get config
  useEffect(() => {
    setFormData({
      ...config,
    });
  }, [loading]);

  // Form handler
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // Save settings
    await updateConfig(formData);
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

  return (
    <Fragment>
      <SettingsHeadline text="Set theme" />
      <div className={classes.ThemerGrid}>
        {themes.map(
          (theme: Theme, idx: number): JSX.Element => (
            <ThemePreview key={idx} theme={theme} applyTheme={setTheme} />
          )
        )}
      </div>

      {isAuthenticated && (
        <form onSubmit={formSubmitHandler}>
          <SettingsHeadline text="Other settings" />
          <InputGroup>
            <label htmlFor="defaultTheme">Default theme (for new users)</label>
            <select
              id="defaultTheme"
              name="defaultTheme"
              value={formData.defaultTheme}
              onChange={(e) => inputChangeHandler(e)}
            >
              {themes.map((theme: Theme, idx) => (
                <option key={idx} value={theme.name}>
                  {theme.name}
                </option>
              ))}
            </select>
          </InputGroup>

          <Button>Save changes</Button>
        </form>
      )}
    </Fragment>
  );
};
