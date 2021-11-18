import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
import { State } from '../../../store/reducers';

// CSS
import classes from './Header.module.css';

// Components
import { WeatherWidget } from '../../Widgets/WeatherWidget/WeatherWidget';

// Utils
import { getDateTime } from './functions/getDateTime';
import { greeter } from './functions/greeter';

export const Header = (): JSX.Element => {
  const { hideHeader, hideDate, showTime } = useSelector(
    (state: State) => state.config.config
  );

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
      {(!hideDate || showTime) && <p>{dateTime}</p>}

      <Link to="/settings" className={classes.SettingsLink}>
        Go to Settings
      </Link>

      {!hideHeader && (
        <span className={classes.HeaderMain}>
          <h1>{greeting}</h1>
          <WeatherWidget />
        </span>
      )}
    </header>
  );
};
