import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { InputGroup } from '@/components/ui/InputGroup';

const ENV_LOCKED_HINT = 'Set via environment variable.';

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'value' | 'onChange'> & {
  id: string;
  label: ReactNode;
  value: string;
  onChange: (value: string) => void;
  hint?: ReactNode;
  isLockedByEnv?: boolean;
};

export const TextField = ({
  id,
  label,
  value,
  onChange,
  hint,
  isLockedByEnv,
  type = 'text',
  name,
  disabled,
  title,
  ...props
}: Props) => {
  const hintContent = isLockedByEnv ? ENV_LOCKED_HINT : hint;

  return (
    <InputGroup>
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        type={type}
        id={id}
        name={name ?? id}
        value={value}
        onChange={event => onChange(event.target.value)}
        disabled={disabled || isLockedByEnv}
        title={isLockedByEnv ? ENV_LOCKED_HINT : title}
      />
      {hintContent ? <span>{hintContent}</span> : null}
    </InputGroup>
  );
};
