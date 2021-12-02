import { ReactNode } from 'react';

import classes from './Message.module.css';

interface Props {
  children: ReactNode;
  isPrimary?: boolean;
}

export const Message = ({ children, isPrimary = true }: Props): JSX.Element => {
  const style = isPrimary ? classes.message : classes.messageCenter;

  return <p className={style}>{children}</p>;
};
