import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { SelectField } from './SelectField';

type Props = Omit<ComponentPropsWithoutRef<'select'>, 'id' | 'value' | 'onChange'> & {
  id: string;
  label: ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;
};

export const BooleanField = ({ value, onChange, ...props }: Props) => {
  return (
    <SelectField
      {...props}
      value={value ? 'true' : 'false'}
      onChange={value => onChange(value === 'true')}
      options={[
        { value: 'true', label: 'True' },
        { value: 'false', label: 'False' },
      ]}
    />
  );
};
