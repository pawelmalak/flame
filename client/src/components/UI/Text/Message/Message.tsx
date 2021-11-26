import { ReactNode } from 'react';

import classes from './Message.module.css';

interface Props {
  children: ReactNode;
}

export const Message = ({ children }: Props): JSX.Element => {
  return <p className={classes.message}>{children}</p>;
};
