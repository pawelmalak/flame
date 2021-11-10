import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Typescript
import { OtherSettingsForm } from '../../../interfaces';

// UI
import { InputGroup, Button, SettingsHeadline } from '../../UI';

// Utils
import { otherSettingsTemplate, inputHandler } from '../../../utility';
import { State } from '../../../store/reducers';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';

export const OtherSettings = (): JSX.Element => {
  const { loading, config } = useSelector((state: State) => state.config);

  const dispatch = useDispatch();
  const { updateConfig, sortApps, sortCategories } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // Initial state
  const [formData, setFormData] = useState<OtherSettingsForm>(
    otherSettingsTemplate
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

    // Update local page title
    document.title = formData.customTitle;

    // Sort apps and categories with new settings
    sortApps();
    sortCategories();
  };

  // Input handler
  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    options?: { isNumber?: boolean; isBool?: boolean }
  ) => {
    inputHandler<OtherSettingsForm>({
      e,
      options,
      setStateHandler: setFormData,
      state: formData,
    });
  };

  return (
    <form onSubmit={(e) => formSubmitHandler(e)}>
      {/* OTHER OPTIONS */}
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

      {/* BEAHVIOR OPTIONS */}
      <SettingsHeadline text="App Behavior" />
      {/* PIN APPS */}
      <InputGroup>
        <label htmlFor="pinAppsByDefault">
          Pin new applications by default
        </label>
        <select
          id="pinAppsByDefault"
          name="pinAppsByDefault"
          value={formData.pinAppsByDefault ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>

      {/* PIN CATEGORIES */}
      <InputGroup>
        <label htmlFor="pinCategoriesByDefault">
          Pin new categories by default
        </label>
        <select
          id="pinCategoriesByDefault"
          name="pinCategoriesByDefault"
          value={formData.pinCategoriesByDefault ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>

      {/* SORT TYPE */}
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

      {/* APPS OPPENING */}
      <InputGroup>
        <label htmlFor="appsSameTab">Open applications in the same tab</label>
        <select
          id="appsSameTab"
          name="appsSameTab"
          value={formData.appsSameTab ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>

      {/* BOOKMARKS OPPENING */}
      <InputGroup>
        <label htmlFor="bookmarksSameTab">Open bookmarks in the same tab</label>
        <select
          id="bookmarksSameTab"
          name="bookmarksSameTab"
          value={formData.bookmarksSameTab ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>

      {/* HEADER OPTIONS */}
      <SettingsHeadline text="Header" />
      {/* HIDE HEADER */}
      <InputGroup>
        <label htmlFor="hideHeader">Hide greeting and date</label>
        <select
          id="hideHeader"
          name="hideHeader"
          value={formData.hideHeader ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
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
          Greetings must be separated with semicolon. Only 4 messages can be
          used
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

      {/* SHOW TIME */}
      <InputGroup>
        <label htmlFor="showTime">Show time</label>
        <select
          id="showTime"
          name="showTime"
          value={formData.showTime ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>

      {/* MODULES OPTIONS */}
      <SettingsHeadline text="Modules" />
      {/* HIDE APPS */}
      <InputGroup>
        <label htmlFor="hideApps">Hide applications</label>
        <select
          id="hideApps"
          name="hideApps"
          value={formData.hideApps ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>

      {/* HIDE CATEGORIES */}
      <InputGroup>
        <label htmlFor="hideCategories">Hide categories</label>
        <select
          id="hideCategories"
          name="hideCategories"
          value={formData.hideCategories ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>

      {/* DOCKER SETTINGS */}
      <SettingsHeadline text="Docker" />
      {/* CUSTOM DOCKER SOCKET HOST */}
      <InputGroup>
        <label htmlFor="dockerHost">Docker Host</label>
        <input
          type="text"
          id="dockerHost"
          name="dockerHost"
          placeholder="dockerHost:port"
          value={formData.dockerHost}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>

      {/* USE DOCKER API */}
      <InputGroup>
        <label htmlFor="dockerApps">Use Docker API</label>
        <select
          id="dockerApps"
          name="dockerApps"
          value={formData.dockerApps ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>

      {/* UNPIN DOCKER APPS */}
      <InputGroup>
        <label htmlFor="unpinStoppedApps">
          Unpin stopped containers / other apps
        </label>
        <select
          id="unpinStoppedApps"
          name="unpinStoppedApps"
          value={formData.unpinStoppedApps ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>

      {/* KUBERNETES SETTINGS */}
      <SettingsHeadline text="Kubernetes" />
      {/* USE KUBERNETES */}
      <InputGroup>
        <label htmlFor="kubernetesApps">Use Kubernetes Ingress API</label>
        <select
          id="kubernetesApps"
          name="kubernetesApps"
          value={formData.kubernetesApps ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>
      <Button>Save changes</Button>
    </form>
  );
};
