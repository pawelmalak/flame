import { useAtomValue } from 'jotai';
import { App } from '../../../interfaces';
import { configAtom } from '../../../state/config';
import { isImage, isSvg, isUrl, urlParser } from '../../../utility';
import { Icon } from '../../UI';
import classes from './AppCard.module.css';

interface Props {
  app: App;
}

export const AppCard = ({ app }: Props): JSX.Element => {
  const config = useAtomValue(configAtom);

  const [displayUrl, redirectUrl] = urlParser(app.url);

  let iconEl: JSX.Element;
  const { icon } = app;

  if (isImage(icon)) {
    const source = isUrl(icon) ? icon : `/uploads/${icon}`;

    iconEl = (
      <img
        src={source}
        alt={`${app.name} icon`}
        className={classes.CustomIcon}
      />
    );
  } else if (isSvg(icon)) {
    const source = isUrl(icon) ? icon : `/uploads/${icon}`;

    iconEl = (
      <div className={classes.CustomIcon}>
        <svg
          data-src={source}
          fill="var(--color-primary)"
          className={classes.CustomIcon}
        ></svg>
      </div>
    );
  } else {
    iconEl = <Icon icon={icon} />;
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
        <h5>{app.name}</h5>
        <span>{!app.description.length ? displayUrl : app.description}</span>
      </div>
    </a>
  );
};
