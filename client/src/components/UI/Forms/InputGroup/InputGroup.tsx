import C from 'classnames';
import { ReactNode } from 'react';
import classes from './InputGroup.module.css';

interface Props {
  type?: 'vertical' | 'horizontal';
  children: ReactNode;
}

export const InputGroup = ({
  type = 'vertical',
  children,
}: Props): JSX.Element => {
  return (
    <div
      className={C(classes.InputGroup, {
        [classes.Horizontal]: type === 'horizontal',
      })}
    >
      {children}
    </div>
  );
};
