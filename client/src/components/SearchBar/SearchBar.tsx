import { useRef, useEffect, KeyboardEvent } from 'react';

// Redux
import { connect } from 'react-redux';
import { createNotification } from '../../store/actions';

// Typescript
import { NewNotification } from '../../interfaces';

// CSS
import classes from './SearchBar.module.css';

// Utils
import { searchParser } from '../../utility';

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

  const searchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const searchResult = searchParser(inputRef.current.value);

    if (searchResult.isLocal) {
      setLocalSearch(searchResult.search);
    }

    if (e.code === 'Enter') {
      if (!searchResult.query.prefix) {
        createNotification({
          title: 'Error',
          message: 'Prefix not found',
        });
      } else if (searchResult.isLocal) {
        setLocalSearch(searchResult.search);
      } else {
        if (searchResult.sameTab) {
          document.location.replace(
            `${searchResult.query.template}${searchResult.search}`
          );
        } else {
          window.open(`${searchResult.query.template}${searchResult.search}`);
        }
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
