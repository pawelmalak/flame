import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { getApps, getCategories } from '../../store/actions';

// Typescript
import { GlobalState } from '../../interfaces/GlobalState';
import { App, Category, Config } from '../../interfaces';

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

interface ComponentProps {
  getApps: Function;
  getCategories: Function;
  appsLoading: boolean;
  apps: App[];
  categoriesLoading: boolean;
  categories: Category[];
  config: Config;
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
  const [appSearchResult, setAppSearchResult] = useState<null | App[]>(null);
  const [bookmarkSearchResult, setBookmarkSearchResult] = useState<
    null | Category[]
  >(null);

  // Load applications
  useEffect(() => {
    if (!apps.length) {
      getApps();
    }
  }, [getApps]);

  // Load bookmark categories
  useEffect(() => {
    if (!categories.length) {
      getCategories();
    }
  }, [getCategories]);

  // Refresh greeter and time
  useEffect(() => {
    let interval: any;

    // Start interval only when hideHeader is false
    if (!props.config.hideHeader) {
      interval = setInterval(() => {
        setHeader({
          dateTime: dateTime(),
          greeting: greeter(),
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (localSearch) {
      // Search through apps
      setAppSearchResult([
        ...apps.filter(({ name }) => new RegExp(localSearch, 'i').test(name)),
      ]);

      // Search through bookmarks
      const category = { ...categories[0] };

      category.name = 'Search Results';
      category.bookmarks = categories
        .map(({ bookmarks }) => bookmarks)
        .flat()
        .filter(({ name }) => new RegExp(localSearch, 'i').test(name));

      setBookmarkSearchResult([category]);
    } else {
      setAppSearchResult(null);
      setBookmarkSearchResult(null);
    }
  }, [localSearch]);

  return (
    <Container>
      {!props.config.hideSearch ? (
        <SearchBar
          setLocalSearch={setLocalSearch}
          appSearchResult={appSearchResult}
          bookmarkSearchResult={bookmarkSearchResult}
        />
      ) : (
        <div></div>
      )}

      {!props.config.hideHeader ? (
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

      {!props.config.hideApps ? (
        <Fragment>
          <SectionHeadline title="Applications" link="/applications" />
          {appsLoading ? (
            <Spinner />
          ) : (
            <AppGrid
              apps={
                !appSearchResult
                  ? apps.filter(({ isPinned }) => isPinned)
                  : appSearchResult
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

      {!props.config.hideCategories ? (
        <Fragment>
          <SectionHeadline title="Bookmarks" link="/bookmarks" />
          {categoriesLoading ? (
            <Spinner />
          ) : (
            <BookmarkGrid
              categories={
                !bookmarkSearchResult
                  ? categories.filter(({ isPinned }) => isPinned)
                  : bookmarkSearchResult
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
    config: state.config.config,
  };
};

export default connect(mapStateToProps, { getApps, getCategories })(Home);
