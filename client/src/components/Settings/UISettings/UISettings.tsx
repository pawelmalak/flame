import { useAtomValue } from 'jotai';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { UISettingsForm } from '../../../interfaces';
import {
  configAtom,
  configLoadingAtom,
  useUpdateConfig,
} from '../../../state/config';
import { inputHandler, uiSettingsTemplate } from '../../../utility';
import { Button, InputGroup, SettingsHeadline } from '../../UI';
import { Checkbox } from '../../UI/Checkbox/Checkbox';

export const UISettings = (): JSX.Element => {
  const loading = useAtomValue(configLoadingAtom);
  const config = useAtomValue(configAtom);
  const updateConfig = useUpdateConfig();

  // Initial state
  const [formData, setFormData] = useState<UISettingsForm>(uiSettingsTemplate);

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

    // Update local page title
    document.title = formData.customTitle;
  };

  // Input handler
  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    options?: { isNumber?: boolean; isBool?: boolean }
  ) => {
    inputHandler<UISettingsForm>({
      e,
      options,
      setStateHandler: setFormData,
      state: formData,
    });
  };

  const onBooleanToggle = (prop: keyof UISettingsForm) =>
    setFormData((prev) => ({ ...prev, [prop]: !prev[prop] }));

  return (
    <form onSubmit={(e) => formSubmitHandler(e)}>
      {/* === OTHER OPTIONS === */}
      <SettingsHeadline text="Miscellaneous" />
      {/* PAGE TITLE */}
      <InputGroup>
        <label htmlFor="customTitle">Custom page title</label>
        <input
          type="text"
          id="customTitle"
          name="customTitle"
          placeholder="Flame"
          value={formData.customTitle}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>

      {/* === SEARCH OPTIONS === */}
      <SettingsHeadline text="Search" />
      {/* HIDE SEARCHBAR */}
      <InputGroup type="horizontal">
        <Checkbox
          id="hideSearch"
          checked={formData.hideSearch}
          onClick={() => onBooleanToggle('hideSearch')}
        />
        <label htmlFor="hideSearch">Hide search bar</label>
      </InputGroup>
      {/* HIDE SEARCH PROVIDER*/}
      <InputGroup type="horizontal">
        <Checkbox
          id="hideSearchProvider"
          checked={formData.hideSearchProvider}
          onClick={() => onBooleanToggle('hideSearchProvider')}
        />
        <label htmlFor="hideSearchProvider">Hide search provider label</label>
      </InputGroup>

      {/* AUTOFOCUS SEARCHBAR */}
      <InputGroup type="horizontal">
        <Checkbox
          id="appsSameTab"
          checked={formData.disableAutofocus}
          onClick={() => onBooleanToggle('disableAutofocus')}
        />
        <label htmlFor="disableAutofocus">Disable search bar autofocus</label>
      </InputGroup>

      <InputGroup type="horizontal">
        <Checkbox
          id="autoClearSearch"
          checked={formData.autoClearSearch}
          onClick={() => onBooleanToggle('autoClearSearch')}
        />
        <label htmlFor="autoClearSearch">
          Automatically clear the search bar
        </label>
      </InputGroup>

      {/* === HEADER OPTIONS === */}
      <SettingsHeadline text="Header" />
      {/* HIDE HEADER */}
      <InputGroup type="horizontal">
        <Checkbox
          id="hideHeader"
          checked={formData.hideHeader}
          onClick={() => onBooleanToggle('hideHeader')}
        />
        <label htmlFor="hideHeader">
          Hide headline (greetings and weather)
        </label>
      </InputGroup>

      {/* HIDE DATE */}
      <InputGroup type="horizontal">
        <Checkbox
          id="hideDate"
          checked={formData.hideDate}
          onClick={() => onBooleanToggle('hideDate')}
        />
        <label htmlFor="hideDate">Hide date</label>
      </InputGroup>

      {/* HIDE TIME */}
      <InputGroup type="horizontal">
        <Checkbox
          id="showTime"
          checked={!formData.showTime}
          onClick={() => onBooleanToggle('showTime')}
        />
        <label htmlFor="showTime">Hide time</label>
      </InputGroup>

      {/* DATE FORMAT */}
      <InputGroup>
        <label htmlFor="useAmericanDate">Date formatting</label>
        <select
          id="useAmericanDate"
          name="useAmericanDate"
          value={formData.useAmericanDate ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>Friday, October 22 2021</option>
          <option value={0}>Friday, 22 October 2021</option>
        </select>
      </InputGroup>

      {/* CUSTOM GREETINGS */}
      <InputGroup>
        <label htmlFor="greetingsSchema">Custom greetings</label>
        <input
          type="text"
          id="greetingsSchema"
          name="greetingsSchema"
          placeholder="Good day;Hi;Bye!"
          value={formData.greetingsSchema}
          onChange={(e) => inputChangeHandler(e)}
        />
        <span>
          Greetings must be separated with semicolon. All 4 messages must be
          filled, even if they are the same
        </span>
      </InputGroup>

      {/* CUSTOM DAYS */}
      <InputGroup>
        <label htmlFor="daySchema">Custom weekday names</label>
        <input
          type="text"
          id="daySchema"
          name="daySchema"
          placeholder="Sunday;Monday;Tuesday"
          value={formData.daySchema}
          onChange={(e) => inputChangeHandler(e)}
        />
        <span>Names must be separated with semicolon</span>
      </InputGroup>

      {/* CUSTOM MONTHS */}
      <InputGroup>
        <label htmlFor="monthSchema">Custom month names</label>
        <input
          type="text"
          id="monthSchema"
          name="monthSchema"
          placeholder="January;February;March"
          value={formData.monthSchema}
          onChange={(e) => inputChangeHandler(e)}
        />
        <span>Names must be separated with semicolon</span>
      </InputGroup>

      {/* === SECTIONS OPTIONS === */}
      <SettingsHeadline text="Sections" />
      {/* HIDE APPS */}
      <InputGroup type="horizontal">
        <Checkbox
          id="hideApps"
          checked={formData.hideApps}
          onClick={() => onBooleanToggle('hideApps')}
        />
        <label htmlFor="hideApps">Hide applications</label>
      </InputGroup>

      {/* HIDE CATEGORIES */}
      <InputGroup type="horizontal">
        <Checkbox
          id="hideCategories"
          checked={formData.hideCategories}
          onClick={() => onBooleanToggle('hideCategories')}
        />
        <label htmlFor="hideCategories">Hide categories</label>
      </InputGroup>

      <Button>Save changes</Button>
    </form>
  );
};
