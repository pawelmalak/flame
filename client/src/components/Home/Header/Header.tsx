import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Config, GlobalState } from '../../../interfaces';
import WeatherWidget from '../../Widgets/WeatherWidget/WeatherWidget';
import { getDateTime } from './functions/getDateTime';
import { greeter } from './functions/greeter';
import classes from './Header.module.css';

interface Props {
  config: Config;
}

const Header = (props: Props): JSX.Element => {
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

const mapStateToProps = (state: GlobalState) => {
  return {
    config: state.config.config,
  };
};

export default connect(mapStateToProps)(Header);
