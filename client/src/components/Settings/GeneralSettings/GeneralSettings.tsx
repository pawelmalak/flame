// React
import { useState, useEffect, FormEvent, ChangeEvent, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Typescript
import { Query, GeneralForm } from '../../../interfaces';

// Components
import { CustomQueries } from './CustomQueries/CustomQueries';

// UI
import { Button, SettingsHeadline, InputGroup } from '../../UI';

// Utils
import { inputHandler, generalSettingsTemplate } from '../../../utility';

// Data
import { queries } from '../../../utility/searchQueries.json';

// Redux
import { State } from '../../../store/reducers';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';

export const GeneralSettings = (): JSX.Element => {
  const { loading, customQueries, config } = useSelector(
    (state: State) => state.config
  );

  const dispatch = useDispatch();
  const { updateConfig } = bindActionCreators(actionCreators, dispatch);

  // Initial state
  const [formData, setFormData] = useState<GeneralForm>(
    generalSettingsTemplate
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
    inputHandler<GeneralForm>({
      e,
      options,
      setStateHandler: setFormData,
      state: formData,
    });
  };

  return (
    <Fragment>
      {/* GENERAL SETTINGS */}
      <form
        onSubmit={(e) => formSubmitHandler(e)}
        style={{ marginBottom: '30px' }}
      >
        <SettingsHeadline text="General" />
        <InputGroup>
          <label htmlFor="defaultSearchProvider">Default search provider</label>
          <select
            id="defaultSearchProvider"
            name="defaultSearchProvider"
            value={formData.defaultSearchProvider}
            onChange={(e) => inputChangeHandler(e)}
          >
            {[...queries, ...customQueries].map((query: Query, idx) => {
              const isCustom = idx >= queries.length;

              return (
                <option key={idx} value={query.prefix}>
                  {isCustom && '+'} {query.name}
                </option>
              );
            })}
          </select>
        </InputGroup>

        <InputGroup>
          <label htmlFor="searchSameTab">
            Open search results in the same tab
          </label>
          <select
            id="searchSameTab"
            name="searchSameTab"
            value={formData.searchSameTab ? 1 : 0}
            onChange={(e) => inputChangeHandler(e, { isBool: true })}
          >
            <option value={1}>True</option>
            <option value={0}>False</option>
          </select>
        </InputGroup>

        <InputGroup>
          <label htmlFor="hideSearch">Hide search bar</label>
          <select
            id="hideSearch"
            name="hideSearch"
            value={formData.hideSearch ? 1 : 0}
            onChange={(e) => inputChangeHandler(e, { isBool: true })}
          >
            <option value={1}>True</option>
            <option value={0}>False</option>
          </select>
        </InputGroup>

        <InputGroup>
          <label htmlFor="disableAutofocus">Disable search bar autofocus</label>
          <select
            id="disableAutofocus"
            name="disableAutofocus"
            value={formData.disableAutofocus ? 1 : 0}
            onChange={(e) => inputChangeHandler(e, { isBool: true })}
          >
            <option value={1}>True</option>
            <option value={0}>False</option>
          </select>
        </InputGroup>

        <Button>Save changes</Button>
      </form>

      {/* CUSTOM QUERIES */}
      <SettingsHeadline text="Custom search providers" />
      <CustomQueries />
    </Fragment>
  );
};
