// Typescript
import { Bookmark, Category } from '../../../interfaces';
import { ContentType } from '../Bookmarks';

// Utils
import { CategoryForm } from './CategoryForm';
import { BookmarksForm } from './BookmarksForm';
import { Fragment } from 'react';

interface Props {
  modalHandler: () => void;
  contentType: ContentType;
  inUpdate?: boolean;
  category?: Category;
  bookmark?: Bookmark;
}

export const Form = (props: Props): JSX.Element => {
  const { modalHandler, contentType, inUpdate, category, bookmark } = props;

  return (
    <Fragment>
      {!inUpdate ? (
        // form: add new
        <Fragment>
          {contentType === ContentType.category ? (
            <CategoryForm modalHandler={modalHandler} />
          ) : (
            <BookmarksForm modalHandler={modalHandler} />
          )}
        </Fragment>
      ) : (
        // form: update
        <Fragment>
          {contentType === ContentType.category ? (
            <CategoryForm modalHandler={modalHandler} category={category} />
          ) : (
            <BookmarksForm modalHandler={modalHandler} bookmark={bookmark} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
