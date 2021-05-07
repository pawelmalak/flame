import classes from './Icon.module.css';

import { Icon as MDIcon } from '@mdi/react';

interface ComponentProps {
  icon: string;
}

const Icon = (props: ComponentProps): JSX.Element => {
  const MDIcons = require('@mdi/js');
  let iconPath = MDIcons[props.icon];

  if (!iconPath) {
    console.log('icon not found');
    iconPath = MDIcons.mdiCancel;
  }

  return (
    <MDIcon className={classes.Icon}
      path={iconPath}
    />
    )
}

export default Icon;