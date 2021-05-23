import { useEffect } from 'react';
import _ from 'underscore';
import { Link } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '../../interfaces/GlobalState';
import { getApps, getCategories } from '../../store/actions';

import Icon from '../UI/Icons/Icon/Icon';

import classes from './Home.module.css';
import { Container } from '../UI/Layout/Layout';
import SectionHeadline from '../UI/Headlines/SectionHeadline/SectionHeadline';
import AppGrid from '../Apps/AppGrid/AppGrid';
import { App, Category } from '../../interfaces';
import Spinner from '../UI/Spinner/Spinner';
import WeatherWidget from '../Widgets/WeatherWidget/WeatherWidget';
import BookmarkGrid from '../Bookmarks/BookmarkGrid/BookmarkGrid';

interface ComponentProps {
  getApps: Function;
  getCategories: Function;
  appsLoading: boolean;
  apps: App[];
  categoriesLoading: boolean;
  categories: Category[];
}

const Home = (props: ComponentProps): JSX.Element => {
  useEffect(() => {
    if (props.apps.length === 0) {
      props.getApps();
    }
  }, [props.getApps]);

  useEffect(() => {
    if (props.categories.length === 0) {
      props.getCategories();
    }
  }, [props.getCategories]);

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

    if (now >= 18) msg = 'Good evening!';
    else if (now >= 12) msg = 'Good afternoon!';
    else if (now >= 6) msg = 'Good morning!';
    else if (now >= 0) msg = 'Good night!';
    else msg = 'Hello!';

    return msg;
  }

  return (
    <Container>
      <header className={classes.Header}>
        <p>{dateAndTime()}</p>
        <span className={classes.HeaderMain}>
          <h1>{greeter()}</h1>
          <WeatherWidget />
        </span>
      </header>
      
      <SectionHeadline title='Applications' link='/applications' />
      {props.appsLoading
        ? <Spinner />
        : <AppGrid apps={props.apps.filter((app: App) => app.isPinned)} />
      }

      <SectionHeadline title='Bookmarks' link='/bookmarks' />
      {props.categoriesLoading
        ? <Spinner />
        : <BookmarkGrid categories={props.categories.filter((category: Category) => category.isPinned)} />
      }

      <Link to='/settings' className={classes.SettingsButton}>
        <Icon icon='mdiCog' color='var(--color-background)' />
      </Link>
    </Container>
  )
}

const mapStateToProps = (state: GlobalState) => {
  return {
    appsLoading: state.app.loading,
    apps: state.app.apps,
    categoriesLoading: state.bookmark.loading,
    categories: state.bookmark.categories
  }
}

export default connect(mapStateToProps, { getApps, getCategories })(Home);