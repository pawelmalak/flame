// React
import { useState, useEffect, FormEvent, ChangeEvent, Fragment } from 'react';
import { connect } from 'react-redux';

// State
import { createNotification, updateConfig } from '../../../store/actions';

// Typescript
import {
  GlobalState,
  NewNotification,
  Query,
  SearchForm,
} from '../../../interfaces';

// Components
import CustomQueries from './CustomQueries/CustomQueries';

// UI
import Button from '../../UI/Buttons/Button/Button';
import SettingsHeadline from '../../UI/Headlines/SettingsHeadline/SettingsHeadline';
import InputGroup from '../../UI/Forms/InputGroup/InputGroup';

// Utils
import { searchConfig } from '../../../utility';

// Data
import { queries } from '../../../utility/searchQueries.json';

interface Props {
  createNotification: (notification: NewNotification) => void;
  updateConfig: (formData: SearchForm) => void;
  loading: boolean;
  customQueries: Query[];
}

const SearchSettings = (props: Props): JSX.Element => {
  // Initial state
  const [formData, setFormData] = useState<SearchForm>({
    hideSearch: 0,
    defaultSearchProvider: 'l',
    searchSameTab: 0,
  });

  // Get config
  useEffect(() => {
    setFormData({
      hideSearch: searchConfig('hideSearch', 0),
      defaultSearchProvider: searchConfig('defaultSearchProvider', 'd'),
      searchSameTab: searchConfig('searchSameTab', 0),
    });
  }, [props.loading]);

  // Form handler
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // Save settings
    await props.updateConfig(formData);
  };

  // Input handler
  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    isNumber?: boolean
  ) => {
    let value: string | number = e.target.value;

    if (isNumber) {
      value = parseFloat(value);
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
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
          <label htmlFor="defaultSearchProvider">Default Search Provider</label>
          <select
            id="defaultSearchProvider"
            name="defaultSearchProvider"
            value={formData.defaultSearchProvider}
            onChange={(e) => inputChangeHandler(e)}
          >
            {[...queries, ...props.customQueries].map((query: Query, idx) => {
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
            value={formData.searchSameTab}
            onChange={(e) => inputChangeHandler(e, true)}
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
            value={formData.hideSearch}
            onChange={(e) => inputChangeHandler(e, true)}
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

const mapStateToProps = (state: GlobalState) => {
  return {
    loading: state.config.loading,
    customQueries: state.config.customQueries,
  };
};

const actions = {
  createNotification,
  updateConfig,
};

export default connect(mapStateToProps, actions)(SearchSettings);
