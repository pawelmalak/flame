import classes from './Icon.module.css';

import { Icon as MDIcon } from '@mdi/react';

interface ComponentProps {
  icon: string;
  color?: string;
}

const Icon = (props: ComponentProps): JSX.Element => {
  const MDIcons = require('@mdi/js');
  let iconPath = MDIcons[props.icon];

  if (!iconPath) {
    console.log(`Icon ${props.icon} not found`);
    iconPath = MDIcons.mdiCancel;
  }

  return (
    <MDIcon
      className={classes.Icon}
      path={iconPath}
      color={props.color ? props.color : 'var(--color-primary)'}
    />
  )
}

export default Icon;