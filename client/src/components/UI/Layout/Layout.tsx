import { ReactNode } from 'react';
import classes from './Layout.module.css';

interface ComponentProps {
  children: ReactNode;
}

export const Container = (props: ComponentProps): JSX.Element => {
  return <div className={classes.Container}>{props.children}</div>;
};
