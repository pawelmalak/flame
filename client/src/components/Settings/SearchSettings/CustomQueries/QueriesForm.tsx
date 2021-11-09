import { ChangeEvent, FormEvent, useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store';

import { Query } from '../../../../interfaces';

import { Button, InputGroup, ModalForm } from '../../../UI';

interface Props {
  modalHandler: () => void;
  query?: Query;
}

export const QueriesForm = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { addQuery, updateQuery } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const { modalHandler, query } = props;

  const [formData, setFormData] = useState<Query>({
    name: '',
    prefix: '',
    template: '',
  });

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formHandler = (e: FormEvent) => {
    e.preventDefault();

    if (query) {
      updateQuery(formData, query.prefix);
    } else {
      addQuery(formData);
    }

    // close modal
    modalHandler();

    // clear form
    setFormData({
      name: '',
      prefix: '',
      template: '',
    });
  };

  useEffect(() => {
    if (query) {
      setFormData(query);
    } else {
      setFormData({
        name: '',
        prefix: '',
        template: '',
      });
    }
  }, [query]);

  return (
    <ModalForm modalHandler={modalHandler} formHandler={formHandler}>
      <InputGroup>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Google"
          required
          value={formData.name}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>

      <InputGroup>
        <label htmlFor="name">Prefix</label>
        <input
          type="text"
          name="prefix"
          id="prefix"
          placeholder="g"
          required
          value={formData.prefix}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>

      <InputGroup>
        <label htmlFor="name">Query Template</label>
        <input
          type="text"
          name="template"
          id="template"
          placeholder="https://www.google.com/search?q="
          required
          value={formData.template}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>

      {query ? <Button>Update provider</Button> : <Button>Add provider</Button>}
    </ModalForm>
  );
};
