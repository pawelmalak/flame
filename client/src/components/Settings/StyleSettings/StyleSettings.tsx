import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

// Redux
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';

// Typescript
import { ApiResponse } from '../../../interfaces';

// Other
import { InputGroup, Button } from '../../UI';
import { applyAuth } from '../../../utility';

export const StyleSettings = (): JSX.Element => {
  const dispatch = useDispatch();
  const { createNotification } = bindActionCreators(actionCreators, dispatch);

  const [customStyles, setCustomStyles] = useState<string>('');

  useEffect(() => {
    axios
      .get<ApiResponse<string>>('/api/config/0/css')
      .then((data) => setCustomStyles(data.data.data))
      .catch((err) => console.log(err.response));
  }, []);

  const inputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setCustomStyles(e.target.value);
  };

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    axios
      .put<ApiResponse<{}>>(
        '/api/config/0/css',
        { styles: customStyles },
        { headers: applyAuth() }
      )
      .then(() => {
        createNotification({
          title: 'Success',
          message: 'CSS saved. Reload page to see changes',
        });
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <form onSubmit={(e) => formSubmitHandler(e)}>
      <InputGroup>
        <label htmlFor="customStyles">Custom CSS</label>
        <textarea
          id="customStyles"
          name="customStyles"
          value={customStyles}
          onChange={(e) => inputChangeHandler(e)}
          spellCheck={false}
        ></textarea>
      </InputGroup>
      <Button>Save CSS</Button>
    </form>
  );
};
