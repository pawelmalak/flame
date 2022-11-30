import { useAtomValue } from 'jotai';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { App, Category } from '../../interfaces';
import { configAtom, configLoadingAtom } from '../../state/config';
import { useCreateNotification } from '../../state/notification';
import { redirectUrl, urlParser, useSearchParser } from '../../utility';
import classes from './SearchBar.module.css';

interface Props {
  setLocalSearch: (query: string) => void;
  appSearchResult: App[] | null;
  bookmarkSearchResult: Category[] | null;
}

export const SearchBar = (props: Props): JSX.Element => {
  const config = useAtomValue(configAtom);
  const loading = useAtomValue(configLoadingAtom);
  const searchParser = useSearchParser();

  const createNotification = useCreateNotification();

  const { setLocalSearch, appSearchResult, bookmarkSearchResult } = props;

  const inputRef = useRef<HTMLInputElement>(document.createElement('input'));

  const [searchProvider, setSearchProvider] = useState(
    searchParser('').primarySearch.name
  );

  // Search bar autofocus
  useEffect(() => {
    if (!loading && !config.disableAutofocus) {
      inputRef.current.focus();
    }
  }, [config]);

  // Listen for keyboard events outside of search bar
  useEffect(() => {
    const keyOutsideFocus = (e: any) => {
      const { key } = e as KeyboardEvent;

      if (key === 'Escape') {
        clearSearch();
      } else if (document.activeElement !== inputRef.current) {
        if (key === '`') {
          inputRef.current.focus();
          clearSearch();
        }
      }
    };

    window.addEventListener('keyup', keyOutsideFocus);

    return () => window.removeEventListener('keyup', keyOutsideFocus);
  }, []);

  const clearSearch = () => {
    inputRef.current.value = '';
    setLocalSearch('');
  };

  const searchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const {
      isLocal,
      encodedURL,
      primarySearch,
      secondarySearch,
      isURL,
      sameTab,
      rawQuery,
    } = searchParser(inputRef.current.value);

    if (isLocal) {
      setLocalSearch(encodedURL);
    }

    if (primarySearch.name) {
      setSearchProvider(primarySearch.name);
    }

    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (!primarySearch.prefix) {
        // Prefix not found -> emit notification
        createNotification({
          title: 'Error',
          message: 'Prefix not found',
        });
      } else if (isURL) {
        // URL or IP passed -> redirect
        const url = urlParser(inputRef.current.value)[1];
        redirectUrl(url, sameTab);
      } else if (isLocal) {
        // Local query -> redirect if at least 1 result found
        if (appSearchResult?.length) {
          redirectUrl(appSearchResult[0].url, sameTab);
        } else if (bookmarkSearchResult?.[0]?.bookmarks?.length) {
          redirectUrl(bookmarkSearchResult[0].bookmarks[0].url, sameTab);
        } else {
          // no local results -> search the internet with the default search provider if query is not empty
          if (!/^ *$/.test(rawQuery)) {
            let template = primarySearch.template;

            if (primarySearch.prefix === 'l') {
              template = secondarySearch.template;
            }

            const url = `${template}${encodedURL}`;
            redirectUrl(url, sameTab);
          }
        }
      } else {
        // Valid query -> redirect to search results
        const url = `${primarySearch.template}${encodedURL}`;
        redirectUrl(url, sameTab);
      }
      if (config.autoClearSearch) clearSearch();
    } else if (e.code === 'Escape') {
      clearSearch();
    }
  };

  return (
    <div className={classes.SearchContainer}>
      {!config.hideSearchProvider && (
        <span className={classes.SearchProvider}>{searchProvider}</span>
      )}
      <input
        ref={inputRef}
        type="text"
        className={classes.SearchBar}
        onKeyUp={(e) => searchHandler(e)}
        onDoubleClick={clearSearch}
      />
    </div>
  );
};
