import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { InputGroup } from '@/components/ui/InputGroup';

type Option<T extends string> = {
  value: T;
  label: ReactNode;
};

type Props<T extends string> = Omit<
  ComponentPropsWithoutRef<'select'>,
  'id' | 'value' | 'onChange'
> & {
  id: string;
  label: ReactNode;
  value: T;
  onChange: (value: T) => void;
  options: ReadonlyArray<Option<T>>;
};

export const SelectField = <T extends string>({
  id,
  label,
  value,
  onChange,
  options,
  name,
  ...props
}: Props<T>) => {
  return (
    <InputGroup>
      <label htmlFor={id}>{label}</label>
      <select
        {...props}
        id={id}
        name={name ?? id}
        value={value}
        onChange={event => onChange(event.target.value as T)}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </InputGroup>
  );
};
