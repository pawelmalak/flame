import { MouseEvent, useRef, useEffect } from 'react';

import classes from './Modal.module.css';

interface ComponentProps {
  isOpen: boolean;
  setIsOpen: Function;
  children: JSX.Element;
}

const Modal = (props: ComponentProps): JSX.Element => {
  const modalRef = useRef(null);
  const modalClasses = [classes.Modal, props.isOpen ? classes.ModalOpen : classes.ModalClose].join(' ');

  const clickHandler = (e: MouseEvent) => {
    if (e.target === modalRef.current) {
      props.setIsOpen(false);
    }
  }

  return (
    <div className={modalClasses} onClick={clickHandler} ref={modalRef}>
      {props.children}
    </div>
  )
}

export default Modal;