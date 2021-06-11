import { Bookmark, Category } from '../../../interfaces';
import classes from './BookmarkCard.module.css';

import Icon from '../../UI/Icons/Icon/Icon';
import { iconParser, urlParser } from '../../../utility';

interface ComponentProps {
  category: Category;
}

const BookmarkCard = (props: ComponentProps): JSX.Element => {
  return (
    <div className={classes.BookmarkCard}>
      <h3>{props.category.name}</h3>
      <div className={classes.Bookmarks}>
        {props.category.bookmarks.map((bookmark: Bookmark) => {
          const [displayUrl, redirectUrl] = urlParser(bookmark.url);

          return (
            <a
              href={redirectUrl}
              target='_blank'
              key={`bookmark-${bookmark.id}`}>
              {bookmark.icon && (
                <div className={classes.BookmarkIcon}>
                  <Icon icon={iconParser(bookmark.icon)} />
                </div>
              )}
              {bookmark.name}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default BookmarkCard;