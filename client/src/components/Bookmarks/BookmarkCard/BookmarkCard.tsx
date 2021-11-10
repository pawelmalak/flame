import { Fragment } from 'react';

import { useSelector } from 'react-redux';
import { State } from '../../../store/reducers';

import { Bookmark, Category } from '../../../interfaces';

import classes from './BookmarkCard.module.css';

import { Icon } from '../../UI';

import { iconParser, isImage, isSvg, isUrl, urlParser } from '../../../utility';

interface Props {
  category: Category;
}

export const BookmarkCard = (props: Props): JSX.Element => {
  const { config } = useSelector((state: State) => state.config);

  return (
    <div className={classes.BookmarkCard}>
      <h3>{props.category.name}</h3>
      <div className={classes.Bookmarks}>
        {props.category.bookmarks.map((bookmark: Bookmark) => {
          const redirectUrl = urlParser(bookmark.url)[1];

          let iconEl: JSX.Element = <Fragment></Fragment>;

          if (bookmark.icon) {
            const { icon, name } = bookmark;

            if (isImage(icon)) {
              const source = isUrl(icon) ? icon : `/uploads/${icon}`;

              iconEl = (
                <div className={classes.BookmarkIcon}>
                  <img
                    src={source}
                    alt={`${name} icon`}
                    className={classes.CustomIcon}
                  />
                </div>
              );
            } else if (isSvg(icon)) {
              const source = isUrl(icon) ? icon : `/uploads/${icon}`;

              iconEl = (
                <div className={classes.BookmarkIcon}>
                  <svg
                    data-src={source}
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
              target={config.bookmarksSameTab ? '' : '_blank'}
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
