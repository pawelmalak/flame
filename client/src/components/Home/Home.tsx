import { useState, useEffect, Fragment } from 'react';
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
import SearchBar from '../SearchBar/SearchBar';

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
    categoriesLoading,
  } = props;

  const [header, setHeader] = useState({
    dateTime: dateTime(),
    greeting: greeter(),
  });

  // Local search query
  const [localSearch, setLocalSearch] = useState<null | string>(null);

  // Load applications
  useEffect(() => {
    if (apps.length === 0) {
      getApps();
    }
  }, [getApps]);

  // Load bookmark categories
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, [getCategories]);

  // Refresh greeter and time
  useEffect(() => {
    let interval: any;

    // Start interval only when hideHeader is false
    if (searchConfig('hideHeader', 0) !== 1) {
      interval = setInterval(() => {
        setHeader({
          dateTime: dateTime(),
          greeting: greeter(),
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, []);

  // Search bookmarks
  const searchBookmarks = (query: string): Category[] => {
    const category = { ...categories[0] };
    category.name = 'Search Results';
    category.bookmarks = categories
      .map(({ bookmarks }) => bookmarks)
      .flat()
      .filter(({ name }) => new RegExp(query, 'i').test(name));

    return [category];
  };

  return (
    <Container>
      {searchConfig('hideSearch', 0) !== 1 ? (
        <SearchBar setLocalSearch={setLocalSearch} />
      ) : (
        <div></div>
      )}

      {searchConfig('hideHeader', 0) !== 1 ? (
        <header className={classes.Header}>
          <p>{header.dateTime}</p>
          <Link to="/settings" className={classes.SettingsLink}>
            Go to Settings
          </Link>
          <span className={classes.HeaderMain}>
            <h1>{header.greeting}</h1>
            <WeatherWidget />
          </span>
        </header>
      ) : (
        <div></div>
      )}

      {searchConfig('hideApps', 0) !== 1 ? (
        <Fragment>
          <SectionHeadline title="Applications" link="/applications" />
          {appsLoading ? (
            <Spinner />
          ) : (
            <AppGrid
              apps={
                !localSearch
                  ? apps.filter(({ isPinned }) => isPinned)
                  : apps.filter(({ name }) =>
                      new RegExp(localSearch, 'i').test(name)
                    )
              }
              totalApps={apps.length}
              searching={!!localSearch}
            />
          )}
          <div className={classes.HomeSpace}></div>
        </Fragment>
      ) : (
        <div></div>
      )}

      {searchConfig('hideCategories', 0) !== 1 ? (
        <Fragment>
          <SectionHeadline title="Bookmarks" link="/bookmarks" />
          {categoriesLoading ? (
            <Spinner />
          ) : (
            <BookmarkGrid
              categories={
                !localSearch
                  ? categories.filter(({ isPinned }) => isPinned)
                  : searchBookmarks(localSearch)
              }
              totalCategories={categories.length}
              searching={!!localSearch}
            />
          )}
        </Fragment>
      ) : (
        <div></div>
      )}

      <Link to="/settings" className={classes.SettingsButton}>
        <Icon icon="mdiCog" color="var(--color-background)" />
      </Link>
    </Container>
  );
};

const mapStateToProps = (state: GlobalState) => {
  return {
    appsLoading: state.app.loading,
    apps: state.app.apps,
    categoriesLoading: state.bookmark.loading,
    categories: state.bookmark.categories,
  };
};

export default connect(mapStateToProps, { getApps, getCategories })(Home);
