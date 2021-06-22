import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { createNotification } from '../../../store/actions';

// Typescript
import { ApiResponse, NewNotification } from '../../../interfaces';

// UI
import InputGroup from '../../UI/Forms/InputGroup/InputGroup';
import Button from '../../UI/Buttons/Button/Button';

interface ComponentProps {
  createNotification: (notification: NewNotification) => void;
}

const StyleSettings = (props: ComponentProps): JSX.Element => {
  const [customStyles, setCustomStyles] = useState<string>('');

  useEffect(() => {
    axios.get<ApiResponse<string>>('/api/config/0/css')
      .then(data => setCustomStyles(data.data.data))
      .catch(err => console.log(err.response));
  }, [])

  const inputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setCustomStyles(e.target.value);
  }

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    axios.put<ApiResponse<{}>>('/api/config/0/css', { styles: customStyles })
      .then(() => {
        props.createNotification({
          title: 'Success',
          message: 'CSS saved. Reload page to see changes'
        })
      })
      .catch(err => console.log(err.response));
  }

  return (
    <form onSubmit={(e) => formSubmitHandler(e)}>
      <InputGroup>
        <label htmlFor='customStyles'>Custom CSS</label>
        <textarea
          id='customStyles'
          name='customStyles'
          value={customStyles}
          onChange={(e) => inputChangeHandler(e)}
          spellCheck={false}
        ></textarea>
      </InputGroup>
      <Button>Save CSS</Button>
    </form>
  )
}

export default connect(null, { createNotification })(StyleSettings);