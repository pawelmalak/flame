// Typescript
import { ContentType } from '../Bookmarks';

// Utils
import { CategoryForm } from './CategoryForm';
import { BookmarksForm } from './BookmarksForm';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../store/reducers';
import { bookmarkTemplate, categoryTemplate } from '../../../utility';

interface Props {
  modalHandler: () => void;
  contentType: ContentType;
  inUpdate?: boolean;
}

export const Form = (props: Props): JSX.Element => {
  const { categoryInEdit, bookmarkInEdit } = useSelector(
    (state: State) => state.bookmarks
  );

  const { modalHandler, contentType, inUpdate } = props;

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
            <CategoryForm
              modalHandler={modalHandler}
              category={categoryInEdit || categoryTemplate}
            />
          ) : (
            <BookmarksForm
              modalHandler={modalHandler}
              bookmark={bookmarkInEdit || bookmarkTemplate}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
