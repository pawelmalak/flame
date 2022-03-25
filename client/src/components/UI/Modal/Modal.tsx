import { MouseEvent, ReactNode, useRef } from 'react';

import classes from './Modal.module.css';

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
  children: ReactNode;
  cb?: Function;
}

export const Modal = ({
  isOpen,
  setIsOpen,
  children,
  cb,
}: Props): JSX.Element => {
  const modalRef = useRef(null);
  const modalClasses = [
    classes.Modal,
    isOpen ? classes.ModalOpen : classes.ModalClose,
  ].join(' ');

  const clickHandler = (e: MouseEvent) => {
    if (e.target === modalRef.current) {
      setIsOpen(false);

      if (cb) cb();
    }
  };

  return (
    <div className={modalClasses} onClick={clickHandler} ref={modalRef}>
      {children}
    </div>
  );
};
