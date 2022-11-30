import { ReactNode, SyntheticEvent } from 'react';
import { Icon } from '../..';
import classes from './ModalForm.module.css';

interface ComponentProps {
  children: ReactNode;
  modalHandler?: () => void;
  formHandler: (e: SyntheticEvent<HTMLFormElement>) => void;
}

export const ModalForm = (props: ComponentProps): JSX.Element => {
  const _modalHandler = (): void => {
    if (props.modalHandler) {
      props.modalHandler();
    }
  };

  return (
    <div className={classes.ModalForm}>
      <div className={classes.ModalFormIcon} onClick={_modalHandler}>
        <Icon icon="mdiClose" />
      </div>
      <form onSubmit={(e) => props.formHandler(e)}>{props.children}</form>
    </div>
  );
};
