import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { App, Category } from '../../interfaces';
import { appsAtom, appsLoadingAtom, useFetchApps } from '../../state/app';
import { authAtom } from '../../state/auth';
import {
  bookmarksLoadingAtom,
  categoriesAtom,
  useFetchCategories,
} from '../../state/bookmark';
import { configAtom } from '../../state/config';
import { escapeRegex } from '../../utility';
import { AppGrid } from '../Apps/AppGrid/AppGrid';
import { BookmarkGrid } from '../Bookmarks/BookmarkGrid/BookmarkGrid';
import { SearchBar } from '../SearchBar/SearchBar';
import { Container, Icon, Message, SectionHeadline, Spinner } from '../UI';
import { Header } from './Header/Header';
import classes from './Home.module.css';

export const Home = (): JSX.Element => {
  const config = useAtomValue(configAtom);

  const { isAuthenticated } = useAtomValue(authAtom);

  const apps = useAtomValue(appsAtom);
  const appsLoading = useAtomValue(appsLoadingAtom);
  const fetchApps = useFetchApps();

  const categories = useAtomValue(categoriesAtom);
  const bookmarksLoading = useAtomValue(bookmarksLoadingAtom);
  const fetchCategories = useFetchCategories();

  // Local search query
  const [localSearch, setLocalSearch] = useState<null | string>(null);
  const [appSearchResult, setAppSearchResult] = useState<null | App[]>(null);
  const [bookmarkSearchResult, setBookmarkSearchResult] = useState<
    null | Category[]
  >(null);

  useEffect(() => {
    if (!apps.length) {
      fetchApps();
    }

    if (!categories.length) {
      fetchCategories();
    }
  }, []);

  useEffect(() => {
    if (localSearch) {
      // Search through apps
      setAppSearchResult([
        ...apps.filter(({ name, description }) =>
          new RegExp(escapeRegex(localSearch), 'i').test(
            `${name} ${description}`
          )
        ),
      ]);

      // Search through bookmarks
      const category = { ...categories[0] };

      category.name = 'Search Results';
      category.bookmarks = categories
        .map(({ bookmarks }) => bookmarks)
        .flat()
        .filter(({ name }) =>
          new RegExp(escapeRegex(localSearch), 'i').test(name)
        );

      setBookmarkSearchResult([category]);
    } else {
      setAppSearchResult(null);
      setBookmarkSearchResult(null);
    }
  }, [localSearch]);

  return (
    <Container>
      {!config.hideSearch ? (
        <SearchBar
          setLocalSearch={setLocalSearch}
          appSearchResult={appSearchResult}
          bookmarkSearchResult={bookmarkSearchResult}
        />
      ) : (
        <div></div>
      )}

      <Header />

      {!isAuthenticated &&
      !apps.some((a) => a.isPinned) &&
      !categories.some((c) => c.isPinned) ? (
        <Message>
          Welcome to Flame! Go to <Link to="/settings/app">/settings</Link>,
          login and start customizing your new homepage
        </Message>
      ) : null}

      {!config.hideApps && (isAuthenticated || apps.some((a) => a.isPinned)) ? (
        <>
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
        </>
      ) : null}

      {!config.hideCategories &&
      (isAuthenticated || categories.some((c) => c.isPinned)) ? (
        <>
          <SectionHeadline title="Bookmarks" link="/bookmarks" />
          {bookmarksLoading ? (
            <Spinner />
          ) : (
            <BookmarkGrid
              categories={
                !bookmarkSearchResult
                  ? categories.filter(
                      ({ isPinned, bookmarks }) => isPinned && bookmarks.length
                    )
                  : bookmarkSearchResult
              }
              totalCategories={categories.length}
              searching={!!localSearch}
              fromHomepage={true}
            />
          )}
        </>
      ) : null}

      <Link to="/settings" className={classes.SettingsButton}>
        <Icon icon="mdiCog" color="var(--color-background)" />
      </Link>
    </Container>
  );
};
