import { Bookmark, Category } from '../../../interfaces';
import classes from './BookmarkCard.module.css';

import Icon from '../../UI/Icons/Icon/Icon';
import { iconParser, urlParser, searchConfig } from '../../../utility';
import { Fragment } from 'react';

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

          let iconEl: JSX.Element = <Fragment></Fragment>;

          if (bookmark.icon) {
            const { icon, name } = bookmark;

            if (/.(jpeg|jpg|png)$/i.test(icon)) {
              iconEl = (
                <div className={classes.BookmarkIcon}>
                  <img
                    src={`/uploads/${icon}`}
                    alt={`${name} icon`}
                    className={classes.CustomIcon}
                  />
                </div>
              );
            } else if (/.(svg)$/i.test(icon)) {
              iconEl = (
                <div className={classes.BookmarkIcon}>
                  <svg
                    data-src={`/uploads/${icon}`}
                    fill="var(--color-primary)"
                    className={classes.BookmarkIconSvg}
                  ></svg>
                </div>
              );
            } else {
              iconEl = (
                <div className={classes.BookmarkIcon}>
                  <Icon icon={iconParser(icon)} />
                </div>
              );
            }
          }

          return (
            <a
              href={redirectUrl}
              target={searchConfig('bookmarksSameTab', false) ? '' : '_blank'}
              rel="noreferrer"
              key={`bookmark-${bookmark.id}`}
            >
              {bookmark.icon && iconEl}
              {bookmark.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default BookmarkCard;
