import { useState } from 'react';
import Button from '../../../UI/Buttons/Button/Button';
import InputGroup from '../../../UI/Forms/InputGroup/InputGroup';
import ModalForm from '../../../UI/Forms/ModalForm/ModalForm';

interface Props {
  modalHandler: () => void;
  // addApp: (formData: NewApp | FormData) => any;
  // updateApp: (id: number, formData: NewApp | FormData) => any;
  // app?: App;
}

const QueriesForm = (props: Props): JSX.Element => {
  const [formData, setFormData] = useState();

  return (
    <ModalForm modalHandler={props.modalHandler} formHandler={() => {}}>
      <InputGroup>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Google"
          required
          // value={formData.name}
          // onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="name">Prefix</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="g"
          required
          // value={formData.name}
          // onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="name">Query Template</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="https://www.google.com/search?q="
          required
          // value={formData.name}
          // onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>
      <Button>Add provider</Button>
    </ModalForm>
  );
};

export default QueriesForm;
