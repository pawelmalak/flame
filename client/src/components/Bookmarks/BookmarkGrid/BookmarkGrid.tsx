import classes from './BookmarkGrid.module.css';

import { Bookmark, Category } from '../../../interfaces';

import BookmarkCard from '../BookmarkCard/BookmarkCard';

interface ComponentProps {
  categories: Category[];
}

const BookmarkGrid = (props: ComponentProps): JSX.Element => {
  return (
    <div className={classes.BookmarkGrid}>
      {props.categories.map((category: Category): JSX.Element => <BookmarkCard category={category} key={category.id} />)}
    </div>
  )
  
}

export default BookmarkGrid;