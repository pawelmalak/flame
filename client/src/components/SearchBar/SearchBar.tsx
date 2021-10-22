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

  const searchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const { isLocal, search, query, isURL, sameTab } = searchParser(
      inputRef.current.value
    );

    if (isLocal) {
      setLocalSearch(search);
    }

    if (e.code === 'Enter') {
      if (!query.prefix) {
        createNotification({
          title: 'Error',
          message: 'Prefix not found',
        });
      } else if (isURL) {
        const url = urlParser(inputRef.current.value)[1];
        redirectUrl(url, sameTab);
      } else if (isLocal) {
        setLocalSearch(search);
      } else {
        const url = `${query.template}${search}`;
        redirectUrl(url, sameTab);
      }
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      className={classes.SearchBar}
      onKeyUp={(e) => searchHandler(e)}
    />
  );
};

export default connect(null, { createNotification })(SearchBar);
