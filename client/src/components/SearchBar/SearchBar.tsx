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
}

const SearchBar = (props: ComponentProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(document.createElement('input'));

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const searchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      const prefixFound = searchParser(inputRef.current.value);

      if (!prefixFound) {
        props.createNotification({
          title: 'Error',
          message: 'Prefix not found'
        })
      }
    }
  }

  return (
    <input
      ref={inputRef}
      type='text'
      className={classes.SearchBar}
      onKeyDown={(e) => searchHandler(e)}
    />
  )
}

export default connect(null, { createNotification })(SearchBar);