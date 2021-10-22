import { useRef, useEffect, KeyboardEvent } from 'react';

// Redux
import { connect } from 'react-redux';
import { createNotification } from '../../store/actions';

// Typescript
import { NewNotification } from '../../interfaces';

// CSS
import classes from './SearchBar.module.css';

// Utils
import { searchParser, urlParser, redirectUrl } from '../../utility';

interface ComponentProps {
  createNotification: (notification: NewNotification) => void;
  setLocalSearch: (query: string) => void;
}

const SearchBar = (props: ComponentProps): JSX.Element => {
  const { setLocalSearch, createNotification } = props;

  const inputRef = useRef<HTMLInputElement>(document.createElement('input'));

  useEffect(() => {
    inputRef.current.focus();
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
        // Local query -> filter apps and bookmarks
        setLocalSearch(search);
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

export default connect(null, { createNotification })(SearchBar);
