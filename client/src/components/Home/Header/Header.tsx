import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// CSS
import classes from './Header.module.css';

// Components
import { WeatherWidget } from '../../Widgets/WeatherWidget/WeatherWidget';

// Utils
import { getDateTime } from './functions/getDateTime';
import { greeter } from './functions/greeter';

export const Header = (): JSX.Element => {
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
      <p>{dateTime}</p>
      <Link to="/settings" className={classes.SettingsLink}>
        Go to Settings
      </Link>
      <span className={classes.HeaderMain}>
        <h1>{greeting}</h1>
        <WeatherWidget />
      </span>
    </header>
  );
};
