import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { addApp, updateApp } from '../../../store/actions';
import { App, NewApp } from '../../../interfaces/App';

import classes from './AppForm.module.css';
import Icon from '../../UI/Icons/Icon/Icon';

interface ComponentProps {
  modalHandler: Function;
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

  useEffect(() => {
    if (props.app) {
      console.log('app');
      setFormData({
        name: props.app.name,
        url: props.app.url,
        icon: props.app.icon
      })
    }
  }, [props.app])

  const _modalHandler = () => {
    props.modalHandler();
  }

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const formSubmitHandler = (e: SyntheticEvent): void => {
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
    <div className={classes.AppForm}>
      <div className={classes.AppFormIcon} onClick={_modalHandler}>
        <Icon icon='mdiClose' />
      </div>
      <form onSubmit={(e) => formSubmitHandler(e)}>
        <div className={classes.InputGroup}>
          <label htmlFor='name'>App Name</label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Bookstack'
            required
            value={formData.name}
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
        <div className={classes.InputGroup}>
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
          <span>Use URL without protocol</span>
        </div>
        <div className={classes.InputGroup}>
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
        </div>
        {!props.app
          ? <button type="submit">add</button>
          : <button type="submit">update</button>
        }
      </form>
    </div>
  )
}

export default connect(null, { addApp, updateApp })(AppForm);