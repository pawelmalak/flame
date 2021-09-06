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
    if (e.code === 'Enter') {
      const searchResult = searchParser(inputRef.current.value);

      if (!searchResult.prefix) {
        createNotification({
          title: 'Error',
          message: 'Prefix not found',
        });
      } else if (searchResult.isLocal) {
        setLocalSearch(searchResult.query);
      }
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      className={classes.SearchBar}
      onKeyDown={(e) => searchHandler(e)}
    />
  );
};

export default connect(null, { createNotification })(SearchBar);
