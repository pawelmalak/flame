import { ChangeEvent, FormEvent, useState, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store';
import { State } from '../../../../store/reducers';

// UI
import { Button, InputGroup, ModalForm } from '../../../UI';
import classes from './ThemeCreator.module.css';

// Other
import { Theme } from '../../../../interfaces';

interface Props {
  modalHandler: () => void;
}

export const ThemeCreator = ({ modalHandler }: Props): JSX.Element => {
  const {
    theme: { activeTheme, themeInEdit },
  } = useSelector((state: State) => state);

  const { addTheme, updateTheme, editTheme } = bindActionCreators(
    actionCreators,
    useDispatch()
  );

  const [formData, setFormData] = useState<Theme>({
    name: '',
    isCustom: true,
    colors: {
      primary: '#ffffff',
      accent: '#ffffff',
      background: '#ffffff',
    },
  });

  useEffect(() => {
    setFormData({ ...formData, colors: activeTheme.colors });
  }, [activeTheme]);

  useEffect(() => {
    if (themeInEdit) {
      setFormData(themeInEdit);
    }
  }, [themeInEdit]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const setColor = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      colors: {
        ...formData.colors,
        [name]: value,
      },
    });
  };

  const closeModal = () => {
    editTheme(null);
    modalHandler();
  };

  const formHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!themeInEdit) {
      addTheme(formData);
    } else {
      updateTheme(formData, themeInEdit.name);
    }

    // close modal
    closeModal();

    // clear theme name
    setFormData({ ...formData, name: '' });
  };

  return (
    <ModalForm formHandler={formHandler} modalHandler={closeModal}>
      <InputGroup>
        <label htmlFor="name">Theme name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="my_theme"
          required
          value={formData.name}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>

      <div className={classes.ColorsContainer}>
        <InputGroup>
          <label htmlFor="primary">Primary color</label>
          <input
            type="color"
            name="primary"
            id="primary"
            required
            value={formData.colors.primary}
            onChange={(e) => setColor(e)}
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="accent">Accent color</label>
          <input
            type="color"
            name="accent"
            id="accent"
            required
            value={formData.colors.accent}
            onChange={(e) => setColor(e)}
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="background">Background color</label>
          <input
            type="color"
            name="background"
            id="background"
            required
            value={formData.colors.background}
            onChange={(e) => setColor(e)}
          />
        </InputGroup>
      </div>

      {!themeInEdit ? (
        <Button>Add theme</Button>
      ) : (
        <Button>Update theme</Button>
      )}
    </ModalForm>
  );
};
