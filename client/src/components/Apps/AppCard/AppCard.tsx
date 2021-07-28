import classes from './AppCard.module.css';
import Icon from '../../UI/Icons/Icon/Icon';
import { iconParser, urlParser } from '../../../utility';

import { App } from '../../../interfaces';
import { searchConfig } from '../../../utility';

interface ComponentProps {
  app: App;
  pinHandler?: Function;
}

const AppCard = (props: ComponentProps): JSX.Element => {
  const [displayUrl, redirectUrl] = urlParser(props.app.url);

  return (
    <a
      href={redirectUrl}
      target={searchConfig('appsSameTab', false) ? '' : '_blank'}
      rel='noreferrer'
      className={classes.AppCard}
    >
      <div className={classes.AppCardIcon}>
        {(/.(jpeg|jpg|png)$/i).test(props.app.icon)
          ? <img
              src={`/uploads/${props.app.icon}`}
              alt={`${props.app.name} icon`}
              className={classes.CustomIcon}
            />
          : <Icon icon={iconParser(props.app.icon)} />
        }
      </div>
      <div className={classes.AppCardDetails}>
        <h5>{props.app.name}</h5>
        <span>{displayUrl}</span>
      </div>
    </a>
  )
}

export default AppCard;