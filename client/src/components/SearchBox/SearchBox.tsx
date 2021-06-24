import { useRef, useEffect, KeyboardEvent } from 'react';

import classes from './SearchBox.module.css';
import { searchParser } from '../../utility';

const SearchBox = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(document.createElement('input'));

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const searchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      searchParser(inputRef.current.value);
    }
  }

  return (
    <input
      ref={inputRef}
      type='text'
      className={classes.SearchBox}
      onKeyDown={(e) => searchHandler(e)}
    />
  )
}

export default SearchBox;