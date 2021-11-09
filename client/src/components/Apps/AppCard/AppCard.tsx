import classes from './AppCard.module.css';
import { Icon } from '../../UI';
import { iconParser, urlParser } from '../../../utility';

import { App } from '../../../interfaces';
import { useSelector } from 'react-redux';
import { State } from '../../../store/reducers';

interface Props {
  app: App;
  pinHandler?: Function;
}

export const AppCard = (props: Props): JSX.Element => {
  const { config } = useSelector((state: State) => state.config);

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
          fill="var(--color-primary)"
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
      target={config.appsSameTab ? '' : '_blank'}
      rel="noreferrer"
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
