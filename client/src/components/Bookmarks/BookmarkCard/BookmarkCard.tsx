import { Bookmark, Category, Config, GlobalState } from '../../../interfaces';
import classes from './BookmarkCard.module.css';

import Icon from '../../UI/Icons/Icon/Icon';
import { iconParser, urlParser } from '../../../utility';
import { Fragment } from 'react';
import { connect } from 'react-redux';

interface ComponentProps {
  category: Category;
  config: Config;
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
              target={props.config.bookmarksSameTab ? '' : '_blank'}
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

const mapStateToProps = (state: GlobalState) => {
  return {
    config: state.config.config,
  };
};

export default connect(mapStateToProps)(BookmarkCard);
