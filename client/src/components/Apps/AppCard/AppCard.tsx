import classes from './AppCard.module.css';
import Icon from '../../UI/Icons/Icon/Icon';
import { iconParser, urlParser } from '../../../utility';

import { App } from '../../../interfaces';

interface ComponentProps {
  app: App;
  pinHandler?: Function;
}

const AppCard = (props: ComponentProps): JSX.Element => {
  const [displayUrl, redirectUrl] = urlParser(props.app.url);

  return (
    <a
      href={redirectUrl}
      target='_blank'
      rel='noreferrer'
      className={classes.AppCard}
    >
      <div className={classes.AppCardIcon}>
        <Icon icon={iconParser(props.app.icon)} />
      </div>
      <div className={classes.AppCardDetails}>
        <h5>{props.app.name}</h5>
        <span>{displayUrl}</span>
      </div>
    </a>
  )
}

export default AppCard;