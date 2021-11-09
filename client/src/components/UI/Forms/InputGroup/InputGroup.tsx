import { ReactNode } from 'react';
import classes from './InputGroup.module.css';

interface Props {
  children: ReactNode;
}

export const InputGroup = (props: Props): JSX.Element => {
  return <div className={classes.InputGroup}>{props.children}</div>;
};
