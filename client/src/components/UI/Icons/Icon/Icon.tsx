import { Icon as MDIcon } from '@mdi/react';
import { iconParser } from '../../../../utility';
import classes from './Icon.module.css';

interface Props {
  icon: string;
  color?: string;
}

export const Icon = ({ icon, color }: Props): JSX.Element => {
  const MDIcons = require('@mdi/js');
  const mdiIcon = iconParser(icon);
  let mdiIconPath = MDIcons[mdiIcon];

  if (!mdiIconPath) {
    return (
      <div className={classes.AppIconWrapper}>
        <img
          src={`https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/${icon}.png`}
          className={classes.AppIcon}
          alt={icon}
        />
      </div>
    );
  } else {
    return (
      <MDIcon
        className={classes.Icon}
        path={mdiIconPath}
        color={color ? color : 'var(--color-primary)'}
      />
    );
  }
};
