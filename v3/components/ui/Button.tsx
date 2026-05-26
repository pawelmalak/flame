import type { ComponentPropsWithoutRef } from 'react';

import styles from './Button.module.css';

type Props = ComponentPropsWithoutRef<'button'>;

export const Button = ({ className, children, type = 'button', ...rest }: Props) => {
  const composedClassName = className ? `${styles.button} ${className}` : styles.button;

  return (
    <button type={type} className={composedClassName} {...rest}>
      {children}
    </button>
  );
};
