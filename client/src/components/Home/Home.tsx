import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GlobalState } from '../../interfaces/GlobalState';
import { getApps } from '../../store/actions';

import Icon from '../UI/Icons/Icon/Icon';
import WeatherIcon from '../UI/Icons/WeatherIcon/WeatherIcon';

import classes from './Home.module.css';
import { Container } from '../UI/Layout/Layout';
import SectionHeadline from '../UI/Headlines/SectionHeadline/SectionHeadline';
import AppGrid from '../Apps/AppGrid/AppGrid';
import { App } from '../../interfaces';
import Spinner from '../UI/Spinner/Spinner';

interface ComponentProps {
  getApps: Function;
  loading: boolean;
  apps: App[];
}

const Home = (props: ComponentProps): JSX.Element => {
  useEffect(() => {
    props.getApps();
  }, [props.getApps]);

  const dateAndTime = (): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const now = new Date();

    const ordinal = (day: number): string => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    }

    return `${days[now.getDay()]}, ${now.getDate()}${ordinal(now.getDate())} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }

  const greeter = (): string => {
    const now = new Date().getHours();
    let msg: string;

    if (now > 18) msg = 'Good evening!';
    else if (now > 12) msg = 'Good afternoon!';
    else if (now > 6) msg = 'Good morning!';
    else if (now > 0) msg = 'Good night!';
    else msg = 'Hello!';

    return msg;
  }

  return (
    <Container>
      <header className={classes.Header}>
        <p>{dateAndTime()}</p>
        <span className={classes.HeaderMain}>
          <h1>{greeter()}</h1>
          <div className={classes.WeatherWidget}>
            <div className={classes.WeatherIcon}>
              <WeatherIcon icon='clear-day' />
            </div>
            <div className={classes.WeatherDetails}>
              <span>30°C</span>
              <span>15°C</span>
            </div>
          </div>
        </span>
      </header>

      <SectionHeadline title='Apps' link='/apps' />
      {props.loading
        ? <Spinner />
        : <AppGrid apps={props.apps.filter((app: App) => app.isPinned)} />
      }

      <SectionHeadline title='Bookmarks' link='/bookmarks' />

      <Link to='/settings' className={classes.SettingsButton}>
        <Icon icon='mdiCog' />
      </Link>
    </Container>
  )
}

const mapStateToProps = (state: GlobalState) => {
  return {
    loading: state.app.loading,
    apps: state.app.apps
  }
}

export default connect(mapStateToProps, { getApps })(Home);