import { Bookmark, Category } from '../../../interfaces';
import classes from './BookmarkCard.module.css';

import Icon from '../../UI/Icons/Icon/Icon';
import { iconParser, urlParser, searchConfig } from '../../../utility';

interface ComponentProps {
  category: Category;
}

const BookmarkCard = (props: ComponentProps): JSX.Element => {
  return (
    <div className={classes.BookmarkCard}>
      <h3>{props.category.name}</h3>
      <div className={classes.Bookmarks}>
        {props.category.bookmarks.map((bookmark: Bookmark) => {
          const redirectUrl = urlParser(bookmark.url)[1];

          return (
            <a
              href={redirectUrl}
              target={searchConfig('bookmarksSameTab', false) ? '' : '_blank'}
              rel='noreferrer'
              key={`bookmark-${bookmark.id}`}>
              {bookmark.icon && (
                <div className={classes.BookmarkIcon}>
                  {(/.(jpeg|jpg|png)$/i).test(bookmark.icon)
                    ? <img
                        src={`/uploads/${bookmark.icon}`}
                        alt={`${bookmark.name} icon`}
                        className={classes.CustomIcon}
                      />
                    : <Icon icon={iconParser(bookmark.icon)} />
                  }
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