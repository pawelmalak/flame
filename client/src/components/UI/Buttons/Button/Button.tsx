import { ReactNode } from 'react';
import classes from './Button.module.css';

interface Props {
  children: ReactNode;
  click?: any;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = (props: Props): JSX.Element => {
  const { children, click, type } = props;

  return (
    <button
      type={type || 'submit'}
      className={classes.Button}
      onClick={click ? click : () => {}}
    >
      {children}
    </button>
  );
};
