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

  let iconEl: JSX.Element;
  const { icon } = props.app;

  if (/.(jpeg|jpg|png)$/i.test(icon)) {
    iconEl = (
      <img
        src={`/uploads/${icon}`}
        alt={`${props.app.name} icon`}
        className={classes.CustomIcon}
      />
    );
  } else if (/.(svg)$/i.test(icon)) {
    iconEl = (
      <div className={classes.CustomIcon}>
        <svg
          data-src={`/uploads/${icon}`}
          fill='var(--color-primary)'
          className={classes.CustomIcon}
        ></svg>
      </div>
    );
  } else {
    iconEl = <Icon icon={iconParser(icon)} />;
  }

  return (
    <a
      href={redirectUrl}
      target={searchConfig('appsSameTab', false) ? '' : '_blank'}
      rel='noreferrer'
      className={classes.AppCard}
    >
      <div className={classes.AppCardIcon}>{iconEl}</div>
      <div className={classes.AppCardDetails}>
        <h5>{props.app.name}</h5>
        <span>{displayUrl}</span>
      </div>
    </a>
  );
};

export default AppCard;
