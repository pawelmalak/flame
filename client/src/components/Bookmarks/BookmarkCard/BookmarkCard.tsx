import { Bookmark, Category } from '../../../interfaces';
import classes from './BookmarkCard.module.css';

interface ComponentProps {
  category: Category;
}

const BookmarkCard = (props: ComponentProps): JSX.Element => {
  return (
    <div className={classes.BookmarkCard}>
      <h3>{props.category.name}</h3>
      <div className={classes.Bookmarks}>
        {props.category.bookmarks.map((bookmark: Bookmark) => (
          <a
            href={`http://${bookmark.url}`}
            target='blank'
            key={`bookmark-${bookmark.id}`}>
            {bookmark.name}
          </a>
        ))}
      </div>
    </div>
  )
}

export default BookmarkCard;