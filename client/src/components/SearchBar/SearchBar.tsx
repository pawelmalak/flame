import { useRef, useEffect, KeyboardEvent } from 'react';

// Redux
import { connect } from 'react-redux';
import { createNotification } from '../../store/actions';

// Typescript
import {
  App,
  Category,
  Config,
  GlobalState,
  NewNotification,
} from '../../interfaces';

// CSS
import classes from './SearchBar.module.css';

// Utils
import { searchParser, urlParser, redirectUrl } from '../../utility';

interface ComponentProps {
  createNotification: (notification: NewNotification) => void;
  setLocalSearch: (query: string) => void;
  appSearchResult: App[] | null;
  bookmarkSearchResult: Category[] | null;
  config: Config;
  loading: boolean;
}

const SearchBar = (props: ComponentProps): JSX.Element => {
  const {
    setLocalSearch,
    createNotification,
    config,
    loading,
    appSearchResult,
    bookmarkSearchResult,
  } = props;

  const inputRef = useRef<HTMLInputElement>(document.createElement('input'));

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
      }
    };

    window.addEventListener('keydown', keyOutsideFocus);

    return () => window.removeEventListener('keydown', keyOutsideFocus);
  }, []);

  const clearSearch = () => {
    inputRef.current.value = '';
    setLocalSearch('');
  };

  const searchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const { isLocal, search, query, isURL, sameTab } = searchParser(
      inputRef.current.value
    );

    if (isLocal) {
      setLocalSearch(search);
    }

    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (!query.prefix) {
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
        } else if (bookmarkSearchResult?.length) {
          redirectUrl(bookmarkSearchResult[0].bookmarks[0].url, sameTab);
        }
      } else {
        // Valid query -> redirect to search results
        const url = `${query.template}${search}`;
        redirectUrl(url, sameTab);
      }
    } else if (e.code === 'Escape') {
      clearSearch();
    }
  };

  return (
    <div className={classes.SearchContainer}>
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

const mapStateToProps = (state: GlobalState) => {
  return {
    config: state.config.config,
    loading: state.config.loading,
  };
};

export default connect(mapStateToProps, { createNotification })(SearchBar);
