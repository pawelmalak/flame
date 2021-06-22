import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

import InputGroup from '../../UI/Forms/InputGroup/InputGroup';
import Button from '../../UI/Buttons/Button/Button';
import { ApiResponse } from '../../../interfaces';

const StyleSettings = (): JSX.Element => {
  const [customStyles, setCustomStyles] = useState<string>('');

  useEffect(() => {
    axios.get<ApiResponse<string>>('/api/config/0/css')
      .then(data => setCustomStyles(data.data.data))
      .catch(err => console.log(err));
  }, [])

  const inputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setCustomStyles(e.target.value);
  }

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    axios.put<ApiResponse<{}>>('/api/config/0/css', { styles: customStyles });
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
        ></textarea>
      </InputGroup>
      <Button>Save CSS</Button>
    </form>
  )
}

export default StyleSettings;