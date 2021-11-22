import { Link } from 'react-router-dom';

import classes from './BookmarkGrid.module.css';

import { Category } from '../../../interfaces';

import { BookmarkCard } from '../BookmarkCard/BookmarkCard';
import { Message } from '../../UI';

interface Props {
  categories: Category[];
  totalCategories?: number;
  searching: boolean;
}

export const BookmarkGrid = (props: Props): JSX.Element => {
  let bookmarks: JSX.Element;

  if (props.categories.length) {
    if (props.searching && !props.categories[0].bookmarks.length) {
      bookmarks = <Message>No bookmarks match your search criteria</Message>;
    } else {
      bookmarks = (
        <div className={classes.BookmarkGrid}>
          {props.categories.map(
            (category: Category): JSX.Element => (
              <BookmarkCard category={category} key={category.id} />
            )
          )}
        </div>
      );
    }
  } else {
    if (props.totalCategories) {
      bookmarks = (
        <Message>
          There are no pinned categories. You can pin them from the{' '}
          <Link to="/bookmarks">/bookmarks</Link> menu
        </Message>
      );
    } else {
      bookmarks = (
        <Message>
          You don't have any bookmarks. You can add a new one from{' '}
          <Link to="/bookmarks">/bookmarks</Link> menu
        </Message>
      );
    }
  }

  return bookmarks;
};
