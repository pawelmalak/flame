import { useState, useEffect, useRef, ChangeEvent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { addApp, updateApp } from '../../../store/actions';
import { App, NewApp } from '../../../interfaces';

import ModalForm from '../../UI/Forms/ModalForm/ModalForm';
import InputGroup from '../../UI/Forms/InputGroup/InputGroup';
import Button from '../../UI/Buttons/Button/Button';

interface ComponentProps {
  modalHandler: () => void;
  addApp: (formData: NewApp) => any;
  updateApp: (id: number, formData: NewApp) => any;
  app?: App;
}

const AppForm = (props: ComponentProps): JSX.Element => {
  const [formData, setFormData] = useState<NewApp>({
    name: '',
    url: '',
    icon: ''
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef])

  useEffect(() => {
    if (props.app) {
      setFormData({
        name: props.app.name,
        url: props.app.url,
        icon: props.app.icon
      })
    } else {
      setFormData({
        name: '',
        url: '',
        icon: ''
      })
    }
  }, [props.app])

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const formSubmitHandler = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!props.app) {
      props.addApp(formData);
    } else {
      props.updateApp(props.app.id, formData);
      props.modalHandler();
    }

    setFormData({
      name: '',
      url: '',
      icon: ''
    })
  }

  return (
    <ModalForm
      modalHandler={props.modalHandler}
      formHandler={formSubmitHandler}
    >
      <InputGroup>
        <label htmlFor='name'>App Name</label>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Bookstack'
          required
          value={formData.name}
          onChange={(e) => inputChangeHandler(e)}
          ref={inputRef}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor='url'>App URL</label>
        <input
          type='text'
          name='url'
          id='url'
          placeholder='bookstack.example.com'
          required
          value={formData.url}
          onChange={(e) => inputChangeHandler(e)}
        />
        <span>Only urls without http[s]:// are supported</span>
      </InputGroup>
      <InputGroup>
        <label htmlFor='icon'>App Icon</label>
        <input
          type='text'
          name='icon'
          id='icon'
          placeholder='book-open-outline'
          required
          value={formData.icon}
          onChange={(e) => inputChangeHandler(e)}
        />
        <span>
          Use icon name from MDI. 
          <a
            href='https://materialdesignicons.com/'
            target='blank'>
            {' '}Click here for reference
          </a>
        </span>
      </InputGroup>
      {!props.app
        ? <Button>Add new application</Button>
        : <Button>Update application</Button>
      }
    </ModalForm>
  )
}

export default connect(null, { addApp, updateApp })(AppForm);