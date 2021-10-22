import classes from './AppCard.module.css';
import Icon from '../../UI/Icons/Icon/Icon';
import { iconParser, urlParser } from '../../../utility';

import { App, Config, GlobalState } from '../../../interfaces';
import { connect } from 'react-redux';

interface ComponentProps {
  app: App;
  pinHandler?: Function;
  config: Config;
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
      target={props.config.appsSameTab ? '' : '_blank'}
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

const mapStateToProps = (state: GlobalState) => {
  return {
    config: state.config.config,
  };
};

export default connect(mapStateToProps)(AppCard);
