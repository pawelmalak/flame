import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { getApps, getCategories } from '../../store/actions';

// Typescript
import { GlobalState } from '../../interfaces/GlobalState';
import { App, Category } from '../../interfaces';

// UI
import Icon from '../UI/Icons/Icon/Icon';
import { Container } from '../UI/Layout/Layout';
import SectionHeadline from '../UI/Headlines/SectionHeadline/SectionHeadline';
import Spinner from '../UI/Spinner/Spinner';

// CSS
import classes from './Home.module.css';

// Components
import AppGrid from '../Apps/AppGrid/AppGrid';
import BookmarkGrid from '../Bookmarks/BookmarkGrid/BookmarkGrid';
import WeatherWidget from '../Widgets/WeatherWidget/WeatherWidget';

// Functions
import { greeter } from './functions/greeter';
import { dateTime } from './functions/dateTime';

// Utils
import { searchConfig } from '../../utility';

interface ComponentProps {
  getApps: Function;
  getCategories: Function;
  appsLoading: boolean;
  apps: App[];
  categoriesLoading: boolean;
  categories: Category[];
}

const Home = (props: ComponentProps): JSX.Element => {
  const {
    getApps,
    apps,
    appsLoading,
    getCategories,
    categories,
    categoriesLoading
  } = props;

  const [header, setHeader] = useState({
    dateTime: dateTime(),
    greeting: greeter()
  })

  // Load applications
  useEffect(() => {
    if (apps.length === 0) {
      getApps();
    }
  }, [getApps, apps]);

  // Load bookmark categories
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, [getCategories, categories]);

  // Refresh greeter and time
  useEffect(() => {
    let interval: any;

    // Start interval only when hideHeader is false
    if (searchConfig('hideHeader', 0) !== 1) {
      interval = setInterval(() => {
        setHeader({
          dateTime: dateTime(),
          greeting: greeter()
        })
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [])
  
  return (
    <Container>
      {searchConfig('hideHeader', 0) !== 1
        ? (
          <header className={classes.Header}>
            <p>{header.dateTime}</p>
            <Link to='/settings' className={classes.SettingsLink}>Go to Settings</Link>
            <span className={classes.HeaderMain}>
              <h1>{header.greeting}</h1>
              <WeatherWidget />
            </span>
          </header>
          )
        : <div></div>
      }
      
      <SectionHeadline title='Applications' link='/applications' />
      {appsLoading
        ? <Spinner />
        : <AppGrid
          apps={apps.filter((app: App) => app.isPinned)}
          totalApps={apps.length}
        />
      }

      <div className={classes.HomeSpace}></div>

      <SectionHeadline title='Bookmarks' link='/bookmarks' />
      {categoriesLoading
        ? <Spinner />
        : <BookmarkGrid
            categories={categories.filter((category: Category) => category.isPinned)}
            totalCategories={categories.length}
        />
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