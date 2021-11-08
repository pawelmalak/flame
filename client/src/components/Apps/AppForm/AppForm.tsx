import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { addApp, updateApp } from '../../../store/actions';
import { App, NewApp } from '../../../interfaces';

import classes from './AppForm.module.css';

import ModalForm from '../../UI/Forms/ModalForm/ModalForm';
import InputGroup from '../../UI/Forms/InputGroup/InputGroup';
import Button from '../../UI/Buttons/Button/Button';
import { inputHandler, newAppTemplate } from '../../../utility';

interface ComponentProps {
  modalHandler: () => void;
  addApp: (formData: NewApp | FormData) => any;
  updateApp: (id: number, formData: NewApp | FormData) => any;
  app?: App;
}

const AppForm = (props: ComponentProps): JSX.Element => {
  const [useCustomIcon, toggleUseCustomIcon] = useState<boolean>(false);
  const [customIcon, setCustomIcon] = useState<File | null>(null);
  const [formData, setFormData] = useState<NewApp>(newAppTemplate);

  useEffect(() => {
    if (props.app) {
      setFormData({
        ...props.app,
      });
    } else {
      setFormData(newAppTemplate);
    }
  }, [props.app]);

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

    const createFormData = (): FormData => {
      const data = new FormData();

      if (customIcon) {
        data.append('icon', customIcon);
      }
      data.append('name', formData.name);
      data.append('url', formData.url);

      return data;
    };

    if (!props.app) {
      if (customIcon) {
        const data = createFormData();
        props.addApp(data);
      } else {
        props.addApp(formData);
      }
    } else {
      if (customIcon) {
        const data = createFormData();
        props.updateApp(props.app.id, data);
      } else {
        props.updateApp(props.app.id, formData);
        props.modalHandler();
      }
    }

    setFormData(newAppTemplate);
  };

  return (
    <ModalForm
      modalHandler={props.modalHandler}
      formHandler={formSubmitHandler}
    >
      {/* NAME */}
      <InputGroup>
        <label htmlFor="name">App Name</label>
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

      {/* ICON */}
      {!useCustomIcon ? (
        // use mdi icon
        <InputGroup>
          <label htmlFor="icon">App Icon</label>
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
            Use icon name from MDI.
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
            accept=".jpg,.jpeg,.png,.svg"
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

      {!props.app ? (
        <Button>Add new application</Button>
      ) : (
        <Button>Update application</Button>
      )}
    </ModalForm>
  );
};

export default connect(null, { addApp, updateApp })(AppForm);
