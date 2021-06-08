import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import InputGroup from '../../UI/Forms/InputGroup/InputGroup';
import Button from '../../UI/Buttons/Button/Button';
import { createNotification } from '../../../store/actions';
import { ApiResponse, Config, NewNotification } from '../../../interfaces';

interface FormState {
  customTitle: string;
}

interface ComponentProps {
  createNotification: (notification: NewNotification) => void;
}

const OtherSettings = (props: ComponentProps): JSX.Element => {
  const [formData, setFormData] = useState<FormState>({
    customTitle: document.title
  })

  // get initial config
  useEffect(() => {
    axios.get<ApiResponse<Config[]>>('/api/config?keys=customTitle')
      .then(data => {
        let tmpFormData = { ...formData };

        data.data.data.forEach((config: Config) => {
          let value: string | number = config.value;
          if (config.valueType === 'number') {
            value = parseFloat(value);
          }

          tmpFormData = {
            ...tmpFormData,
            [config.key]: value
          }
        })

        setFormData(tmpFormData);
      })
      .catch(err => console.log(err));
  }, [])

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    axios.put<ApiResponse<{}>>('/api/config', formData)
      .then(() => {
        props.createNotification({
          title: 'Success',
          message: 'Settings updated'
        })
      })
      .catch((err) => console.log(err));

    // update local page title
    localStorage.setItem('customTitle', formData.customTitle);
    document.title = formData.customTitle;
  }

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={(e) => formSubmitHandler(e)}>
      <InputGroup>
        <label htmlFor='customTitle'>Custom Page Title</label>
        <input
          type='text'
          id='customTitle'
          name='customTitle'
          placeholder='Flame'
          value={formData.customTitle}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>
    <Button>Save changes</Button>
    </form>
  )
}

export default connect(null, { createNotification })(OtherSettings);