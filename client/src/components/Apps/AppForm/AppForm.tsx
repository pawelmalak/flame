import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewApp } from '../../../interfaces';

import classes from './AppForm.module.css';

import { ModalForm, InputGroup, Button } from '../../UI';
import { inputHandler, newAppTemplate } from '../../../utility';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';
import { State } from '../../../store/reducers';

interface Props {
  modalHandler: () => void;
}

export const AppForm = ({ modalHandler }: Props): JSX.Element => {
  const { appInUpdate } = useSelector((state: State) => state.apps);

  const dispatch = useDispatch();
  const { addApp, updateApp, setEditApp, createNotification } =
    bindActionCreators(actionCreators, dispatch);

  const [useCustomIcon, toggleUseCustomIcon] = useState<boolean>(false);
  const [customIcon, setCustomIcon] = useState<File | null>(null);
  const [formData, setFormData] = useState<NewApp>(newAppTemplate);

  useEffect(() => {
    if (appInUpdate) {
      setFormData({
        ...appInUpdate,
      });
    } else {
      setFormData(newAppTemplate);
    }
  }, [appInUpdate]);

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    options?: { isNumber?: boolean; isBool?: boolean }
  ) => {
    inputHandler<NewApp>({
      e,
      options,
      setStateHandler: setFormData,
      state: formData,
    });
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setCustomIcon(e.target.files[0]);
    }
  };

  const formSubmitHandler = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    for (let field of ['name', 'url', 'icon'] as const) {
      if (/^ +$/.test(formData[field])) {
        createNotification({
          title: 'Error',
          message: `Field cannot be empty: ${field}`,
        });

        return;
      }
    }

    const createFormData = (): FormData => {
      const data = new FormData();

      if (customIcon) {
        data.append('icon', customIcon);
      }

      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('url', formData.url);
      data.append('isPublic', `${formData.isPublic ? 1 : 0}`);

      return data;
    };

    if (!appInUpdate) {
      if (customIcon) {
        const data = createFormData();
        addApp(data);
      } else {
        addApp(formData);
      }
    } else {
      if (customIcon) {
        const data = createFormData();
        updateApp(appInUpdate.id, data);
      } else {
        updateApp(appInUpdate.id, formData);
        modalHandler();
      }
    }

    setFormData(newAppTemplate);
    setEditApp(null);
  };

  return (
    <ModalForm modalHandler={modalHandler} formHandler={formSubmitHandler}>
      {/* NAME */}
      <InputGroup>
        <label htmlFor="name">App name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Bookstack"
          required
          value={formData.name}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>

      {/* URL */}
      <InputGroup>
        <label htmlFor="url">App URL</label>
        <input
          type="text"
          name="url"
          id="url"
          placeholder="bookstack.example.com"
          required
          value={formData.url}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>

      {/* DESCRIPTION */}
      <InputGroup>
        <label htmlFor="description">App description</label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="My self-hosted app"
          value={formData.description}
          onChange={(e) => inputChangeHandler(e)}
        />
        <span>
          Optional - If description is not set, app URL will be displayed
        </span>
      </InputGroup>

      {/* ICON */}
      {!useCustomIcon ? (
        // use mdi icon
        <InputGroup>
          <label htmlFor="icon">App icon</label>
          <input
            type="text"
            name="icon"
            id="icon"
            placeholder="book-open-outline"
            required
            value={formData.icon}
            onChange={(e) => inputChangeHandler(e)}
          />
          <span>
            Use icon name from MDI or pass a valid URL.
            <a href="https://materialdesignicons.com/" target="blank">
              {' '}
              Click here for reference
            </a>
          </span>
          <span
            onClick={() => toggleUseCustomIcon(!useCustomIcon)}
            className={classes.Switch}
          >
            Switch to custom icon upload
          </span>
        </InputGroup>
      ) : (
        // upload custom icon
        <InputGroup>
          <label htmlFor="icon">App Icon</label>
          <input
            type="file"
            name="icon"
            id="icon"
            required
            onChange={(e) => fileChangeHandler(e)}
            accept=".jpg,.jpeg,.png,.svg,.ico"
          />
          <span
            onClick={() => {
              setCustomIcon(null);
              toggleUseCustomIcon(!useCustomIcon);
            }}
            className={classes.Switch}
          >
            Switch to MDI
          </span>
        </InputGroup>
      )}

      {/* VISIBILITY */}
      <InputGroup>
        <label htmlFor="isPublic">App visibility</label>
        <select
          id="isPublic"
          name="isPublic"
          value={formData.isPublic ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>Visible (anyone can access it)</option>
          <option value={0}>Hidden (authentication required)</option>
        </select>
      </InputGroup>

      {!appInUpdate ? (
        <Button>Add new application</Button>
      ) : (
        <Button>Update application</Button>
      )}
    </ModalForm>
  );
};
