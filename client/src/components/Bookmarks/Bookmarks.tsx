import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../store/reducers';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store';

// Typescript
import { Category, Bookmark } from '../../interfaces';

// CSS
import classes from './Bookmarks.module.css';

// UI
import { Container, Headline, ActionButton, Spinner, Modal } from '../UI';

// Components
import { BookmarkGrid } from './BookmarkGrid/BookmarkGrid';
import { BookmarkForm } from './BookmarkForm/BookmarkForm';
import { BookmarkTable } from './BookmarkTable/BookmarkTable';

// Utils
import { bookmarkTemplate, categoryTemplate } from '../../utility';

interface Props {
  searching: boolean;
}

export enum ContentType {
  category,
  bookmark,
}

export const Bookmarks = (props: Props): JSX.Element => {
  const { loading, categories } = useSelector(
    (state: State) => state.bookmarks
  );

  const dispatch = useDispatch();
  const { getCategories } = bindActionCreators(actionCreators, dispatch);

  const { searching = false } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formContentType, setFormContentType] = useState(ContentType.category);
  const [isInEdit, setIsInEdit] = useState(false);
  const [tableContentType, setTableContentType] = useState(
    ContentType.category
  );
  const [isInUpdate, setIsInUpdate] = useState(false);
  const [categoryInUpdate, setCategoryInUpdate] =
    useState<Category>(categoryTemplate);
  const [bookmarkInUpdate, setBookmarkInUpdate] =
    useState<Bookmark>(bookmarkTemplate);

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, [getCategories]);

  const toggleModal = (): void => {
    setModalIsOpen(!modalIsOpen);
  };

  const addActionHandler = (contentType: ContentType) => {
    setFormContentType(contentType);
    setIsInUpdate(false);
    toggleModal();
  };

  const editActionHandler = (contentType: ContentType) => {
    // We're in the edit mode and the same button was clicked - go back to list
    if (isInEdit && contentType === tableContentType) {
      setIsInEdit(false);
    } else {
      setIsInEdit(true);
      setTableContentType(contentType);
    }
  };

  const instanceOfCategory = (object: any): object is Category => {
    return 'bookmarks' in object;
  };

  const goToUpdateMode = (data: Category | Bookmark): void => {
    setIsInUpdate(true);
    if (instanceOfCategory(data)) {
      setFormContentType(ContentType.category);
      setCategoryInUpdate(data);
    } else {
      setFormContentType(ContentType.bookmark);
      setBookmarkInUpdate(data);
    }
    toggleModal();
  };

  return (
    <Container>
      <Modal isOpen={modalIsOpen} setIsOpen={toggleModal}>
        {!isInUpdate ? (
          <BookmarkForm
            modalHandler={toggleModal}
            contentType={formContentType}
          />
        ) : formContentType === ContentType.category ? (
          <BookmarkForm
            modalHandler={toggleModal}
            contentType={formContentType}
            category={categoryInUpdate}
          />
        ) : (
          <BookmarkForm
            modalHandler={toggleModal}
            contentType={formContentType}
            bookmark={bookmarkInUpdate}
          />
        )}
      </Modal>

      <Headline title="All Bookmarks" subtitle={<Link to="/">Go back</Link>} />

      <div className={classes.ActionsContainer}>
        <ActionButton
          name="Add Category"
          icon="mdiPlusBox"
          handler={() => addActionHandler(ContentType.category)}
        />
        <ActionButton
          name="Add Bookmark"
          icon="mdiPlusBox"
          handler={() => addActionHandler(ContentType.bookmark)}
        />
        <ActionButton
          name="Edit Categories"
          icon="mdiPencil"
          handler={() => editActionHandler(ContentType.category)}
        />
        <ActionButton
          name="Edit Bookmarks"
          icon="mdiPencil"
          handler={() => editActionHandler(ContentType.bookmark)}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : !isInEdit ? (
        <BookmarkGrid categories={categories} searching />
      ) : (
        <BookmarkTable
          contentType={tableContentType}
          categories={categories}
          updateHandler={goToUpdateMode}
        />
      )}
    </Container>
  );
};
