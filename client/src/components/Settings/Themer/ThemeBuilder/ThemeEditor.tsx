import { ModalForm } from '../../../UI';

interface Props {
  modalHandler: () => void;
}

export const ThemeEditor = (props: Props): JSX.Element => {
  return (
    <ModalForm formHandler={() => {}} modalHandler={props.modalHandler}>
      <h1>edit</h1>
    </ModalForm>
  );
};
