import { SyntheticEvent } from 'react';

import classes from './ModalForm.module.css';
import Icon from '../../Icons/Icon/Icon';

interface ComponentProps {
  children: JSX.Element | JSX.Element[];
  modalHandler?: () => void;
  formHandler: (e: SyntheticEvent<HTMLFormElement>) => void;
}

const ModalForm = (props: ComponentProps): JSX.Element => {
  const _modalHandler = (): void => {
    if (props.modalHandler) {
      props.modalHandler();
    }
  }

  return (
    <div className={classes.ModalForm}>
      <div className={classes.ModalFormIcon} onClick={_modalHandler}>
        <Icon icon='mdiClose' />
      </div>
      <form onSubmit={(e) => props.formHandler(e)}>
        {props.children}
      </form>
    </div>
  )
}

export default ModalForm;