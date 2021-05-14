import classes from './Modal.module.css';

interface ComponentProps {
  isOpen: boolean;
  children: JSX.Element;
}

const Modal = (props: ComponentProps): JSX.Element => {
  const modalClasses = [classes.Modal, props.isOpen ? classes.ModalOpen : classes.ModalClose].join(' ');

  return (
    <div className={modalClasses}>
      {props.children}
    </div>
  )
}

export default Modal;