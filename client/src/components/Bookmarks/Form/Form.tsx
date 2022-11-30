import { useAtomValue } from 'jotai';
import {
  bookmarkInEditAtom,
  categoryInEditAtom,
} from '../../../state/bookmark';
import { bookmarkTemplate, categoryTemplate } from '../../../utility';
import { ContentType } from '../Bookmarks';
import { BookmarksForm } from './BookmarksForm';
import { CategoryForm } from './CategoryForm';

interface Props {
  modalHandler: () => void;
  contentType: ContentType;
  inUpdate?: boolean;
}

export const Form = (props: Props): JSX.Element => {
  const categoryInEdit = useAtomValue(categoryInEditAtom);
  const bookmarkInEdit = useAtomValue(bookmarkInEditAtom);

  const { modalHandler, contentType, inUpdate } = props;

  return (
    <>
      {!inUpdate ? (
        // form: add new
        <>
          {contentType === ContentType.category ? (
            <CategoryForm modalHandler={modalHandler} />
          ) : (
            <BookmarksForm modalHandler={modalHandler} />
          )}
        </>
      ) : (
        // form: update
        <>
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
        </>
      )}
    </>
  );
};
