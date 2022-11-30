import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { configAtom } from '../../../state/config';
import { WeatherWidget } from '../../Widgets/WeatherWidget/WeatherWidget';
import { getDateTime } from './functions/getDateTime';
import { greeter } from './functions/greeter';
import classes from './Header.module.css';

export const Header = (): JSX.Element => {
  const { hideHeader, hideDate, showTime } = useAtomValue(configAtom);

  const [dateTime, setDateTime] = useState<string>(getDateTime());
  const [greeting, setGreeting] = useState<string>(greeter());

  useEffect(() => {
    let dateTimeInterval: NodeJS.Timeout;

    dateTimeInterval = setInterval(() => {
      setDateTime(getDateTime());
      setGreeting(greeter());
    }, 1000);

    return () => window.clearInterval(dateTimeInterval);
  }, []);

  return (
    <header className={classes.Header}>
      <Link to="/settings" className={classes.SettingsLink}>
        Go to Settings
      </Link>

      {(!hideDate || showTime) && <p>{dateTime}</p>}

      {!hideHeader && (
        <span className={classes.HeaderMain}>
          <h1>{greeting}</h1>
          <WeatherWidget />
        </span>
      )}
    </header>
  );
};
