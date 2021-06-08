import { Link } from 'react-router-dom';

import classes from './BookmarkGrid.module.css';

import { Bookmark, Category } from '../../../interfaces';

import BookmarkCard from '../BookmarkCard/BookmarkCard';

interface ComponentProps {
  categories: Category[];
  totalCategories?: number;
}

const BookmarkGrid = (props: ComponentProps): JSX.Element => {
  let bookmarks: JSX.Element;

  if (props.categories.length > 0) {
    bookmarks = (
      <div className={classes.BookmarkGrid}>
        {props.categories.map((category: Category): JSX.Element => <BookmarkCard category={category} key={category.id} />)}
      </div>
    );
  } else {
    if (props.totalCategories) {
      bookmarks = (
        <p className={classes.BookmarksMessage}>There are no pinned categories. You can pin them from the <Link to='/bookmarks'>/bookmarks</Link> menu</p>
      );
    } else {
      bookmarks = (
        <p className={classes.BookmarksMessage}>You don't have any bookmarks. You can add a new one from <Link to='/bookmarks'>/bookmarks</Link> menu</p>
      );
    }
  }

  return bookmarks;
}

export default BookmarkGrid;