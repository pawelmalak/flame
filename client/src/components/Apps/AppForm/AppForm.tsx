import { useState, ChangeEvent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { addApp } from '../../../store/actions';
import { NewApp } from '../../../interfaces/App';

import classes from './AppForm.module.css';
import Icon from '../../UI/Icon/Icon';

interface ComponentProps {
  modalHandler: Function;
  addApp: (formData: NewApp) => any;
}

const AppForm = (props: ComponentProps): JSX.Element => {
  const [formData, setFormData] = useState<NewApp>({
    name: '',
    url: '',
    icon: ''
  });

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
    props.addApp(formData);
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
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default connect(null, { addApp })(AppForm);