import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

// Redux
import { connect } from 'react-redux';
import {
  createNotification,
  updateConfig,
  sortApps,
  sortCategories,
} from '../../../store/actions';

// Typescript
import {
  GlobalState,
  NewNotification,
  SettingsForm,
} from '../../../interfaces';

// UI
import InputGroup from '../../UI/Forms/InputGroup/InputGroup';
import Button from '../../UI/Buttons/Button/Button';
import SettingsHeadline from '../../UI/Headlines/SettingsHeadline/SettingsHeadline';

// Utils
import { searchConfig } from '../../../utility';

interface ComponentProps {
  createNotification: (notification: NewNotification) => void;
  updateConfig: (formData: SettingsForm) => void;
  sortApps: () => void;
  sortCategories: () => void;
  loading: boolean;
}

const OtherSettings = (props: ComponentProps): JSX.Element => {
  // Initial state
  const [formData, setFormData] = useState<SettingsForm>({
    customTitle: document.title,
    pinAppsByDefault: 1,
    pinCategoriesByDefault: 1,
    hideHeader: 0,
    hideApps: 0,
    hideCategories: 0,
    useOrdering: 'createdAt',
    appsSameTab: 0,
    bookmarksSameTab: 0,
    dockerApps: 0,
    kubernetesApps: 0,
    unpinStoppedApps: 0,
  });

  // Get config
  useEffect(() => {
    setFormData({
      customTitle: searchConfig('customTitle', 'Flame'),
      pinAppsByDefault: searchConfig('pinAppsByDefault', 1),
      pinCategoriesByDefault: searchConfig('pinCategoriesByDefault', 1),
      hideHeader: searchConfig('hideHeader', 0),
      hideApps: searchConfig('hideApps', 0),
      hideCategories: searchConfig('hideCategories', 0),
      useOrdering: searchConfig('useOrdering', 'createdAt'),
      appsSameTab: searchConfig('appsSameTab', 0),
      bookmarksSameTab: searchConfig('bookmarksSameTab', 0),
      dockerApps: searchConfig('dockerApps', 0),
      kubernetesApps: searchConfig('kubernetesApps', 0),
      unpinStoppedApps: searchConfig('unpinStoppedApps', 0),
    });
  }, [props.loading]);

  // Form handler
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // Save settings
    await props.updateConfig(formData);

    // Update local page title
    document.title = formData.customTitle;

    // Sort apps and categories with new settings
    props.sortApps();
    props.sortCategories();
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
    <form onSubmit={(e) => formSubmitHandler(e)}>
      {/* OTHER OPTIONS */}
      <SettingsHeadline text="Miscellaneous" />
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

      {/* BEAHVIOR OPTIONS */}
      <SettingsHeadline text="App Behavior" />
      <InputGroup>
        <label htmlFor="pinAppsByDefault">
          Pin new applications by default
        </label>
        <select
          id="pinAppsByDefault"
          name="pinAppsByDefault"
          value={formData.pinAppsByDefault}
          onChange={(e) => inputChangeHandler(e, true)}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>
      <InputGroup>
        <label htmlFor="pinCategoriesByDefault">
          Pin new categories by default
        </label>
        <select
          id="pinCategoriesByDefault"
          name="pinCategoriesByDefault"
          value={formData.pinCategoriesByDefault}
          onChange={(e) => inputChangeHandler(e, true)}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>
      <InputGroup>
        <label htmlFor="useOrdering">Sorting type</label>
        <select
          id="useOrdering"
          name="useOrdering"
          value={formData.useOrdering}
          onChange={(e) => inputChangeHandler(e)}
        >
          <option value="createdAt">By creation date</option>
          <option value="name">Alphabetical order</option>
          <option value="orderId">Custom order</option>
        </select>
      </InputGroup>
      <InputGroup>
        <label htmlFor="appsSameTab">Open applications in the same tab</label>
        <select
          id="appsSameTab"
          name="appsSameTab"
          value={formData.appsSameTab}
          onChange={(e) => inputChangeHandler(e, true)}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>
      <InputGroup>
        <label htmlFor="bookmarksSameTab">Open bookmarks in the same tab</label>
        <select
          id="bookmarksSameTab"
          name="bookmarksSameTab"
          value={formData.bookmarksSameTab}
          onChange={(e) => inputChangeHandler(e, true)}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>

      {/* MODULES OPTIONS */}
      <SettingsHeadline text="Modules" />
      <InputGroup>
        <label htmlFor="hideHeader">Hide greeting and date</label>
        <select
          id="hideHeader"
          name="hideHeader"
          value={formData.hideHeader}
          onChange={(e) => inputChangeHandler(e, true)}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>
      <InputGroup>
        <label htmlFor="hideApps">Hide applications</label>
        <select
          id="hideApps"
          name="hideApps"
          value={formData.hideApps}
          onChange={(e) => inputChangeHandler(e, true)}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>
      <InputGroup>
        <label htmlFor="hideCategories">Hide categories</label>
        <select
          id="hideCategories"
          name="hideCategories"
          value={formData.hideCategories}
          onChange={(e) => inputChangeHandler(e, true)}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>

      {/* DOCKER SETTINGS */}
      <SettingsHeadline text="Docker" />
      <InputGroup>
        <label htmlFor="dockerApps">Use Docker API</label>
        <select
          id="dockerApps"
          name="dockerApps"
          value={formData.dockerApps}
          onChange={(e) => inputChangeHandler(e, true)}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>
      <InputGroup>
        <label htmlFor="unpinStoppedApps">
          Unpin stopped containers / other apps
        </label>
        <select
          id="unpinStoppedApps"
          name="unpinStoppedApps"
          value={formData.unpinStoppedApps}
          onChange={(e) => inputChangeHandler(e, true)}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>

      {/* KUBERNETES SETTINGS */}
      <SettingsHeadline text="Kubernetes" />
      <InputGroup>
        <label htmlFor="kubernetesApps">Use Kubernetes Ingress API</label>
        <select
          id="kubernetesApps"
          name="kubernetesApps"
          value={formData.kubernetesApps}
          onChange={(e) => inputChangeHandler(e, true)}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>
      <Button>Save changes</Button>
    </form>
  );
};

const mapStateToProps = (state: GlobalState) => {
  return {
    loading: state.config.loading,
  };
};

const actions = {
  createNotification,
  updateConfig,
  sortApps,
  sortCategories,
};

export default connect(mapStateToProps, actions)(OtherSettings);
