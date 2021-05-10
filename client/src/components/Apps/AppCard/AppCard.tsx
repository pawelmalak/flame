import classes from './AppCard.module.css';
import Icon from '../../UI/Icon/Icon';

import { App } from '../../../interfaces';

interface ComponentProps {
  app: App;
}

const AppCard = (props: ComponentProps): JSX.Element => {
  const iconParser = (mdiName: string): string => {
    let parsedName = mdiName
      .split('-')
      .map((word: string) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join('');
    parsedName = `mdi${parsedName}`;

    return parsedName;
  }

  return (
    <div className={classes.AppCard}>
      <div className={classes.AppCardIcon}>
        <Icon icon={iconParser(props.app.icon)} />
      </div>
      <div className={classes.AppCardDetails}>
        <h5>{props.app.name}</h5>
        <a href="/">{props.app.url}</a>
      </div>
    </div>
  )
}

export default AppCard;