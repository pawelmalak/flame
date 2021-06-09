import { Link } from 'react-router-dom';

import classes from './AppCard.module.css';
import Icon from '../../UI/Icons/Icon/Icon';
import { iconParser } from '../../../utility/iconParser';

import { App } from '../../../interfaces';

interface ComponentProps {
  app: App;
  pinHandler?: Function;
}

const AppCard = (props: ComponentProps): JSX.Element => {
  const redirectHandler = (url: string): void => {
    window.open(url);
  }

  return (
    <a href={`http://${props.app.url}`} target='blank' className={classes.AppCard}>
      <div className={classes.AppCardIcon}>
        <Icon icon={iconParser(props.app.icon)} />
      </div>
      <div className={classes.AppCardDetails}>
        <h5>{props.app.name}</h5>
        <span>{props.app.url}</span>
      </div>
    </a>
  )
}

export default AppCard;