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
import {
  Container,
  Headline,
  ActionButton,
  Spinner,
  Modal,
  Message,
} from '../UI';

// Components
import { BookmarkGrid } from './BookmarkGrid/BookmarkGrid';
import { Form } from './Form/Form';
import { Table } from './Table/Table';

interface Props {
  searching: boolean;
}

export enum ContentType {
  category,
  bookmark,
}

export const Bookmarks = (props: Props): JSX.Element => {
  // Get Redux state
  const {
    bookmarks: { loading, categories, categoryInEdit },
    auth: { isAuthenticated },
  } = useSelector((state: State) => state);

  // Get Redux action creators
  const dispatch = useDispatch();
  const { getCategories, setEditCategory, setEditBookmark } =
    bindActionCreators(actionCreators, dispatch);

  // Load categories if array is empty
  useEffect(() => {
    if (!categories.length) {
      getCategories();
    }
  }, []);

  // Form
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formContentType, setFormContentType] = useState(ContentType.category);
  const [isInUpdate, setIsInUpdate] = useState(false);

  // Table
  const [showTable, setShowTable] = useState(false);
  const [tableContentType, setTableContentType] = useState(
    ContentType.category
  );

  // Observe if user is authenticated -> set default view (grid) if not
  useEffect(() => {
    if (!isAuthenticated) {
      setShowTable(false);
      setModalIsOpen(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (categoryInEdit && !modalIsOpen) {
      setTableContentType(ContentType.bookmark);
      setShowTable(true);
    }
  }, [categoryInEdit]);

  useEffect(() => {
    setShowTable(false);
    setEditCategory(null);
  }, []);

  // Form actions
  const toggleModal = (): void => {
    setModalIsOpen(!modalIsOpen);
  };

  const openFormForAdding = (contentType: ContentType) => {
    setFormContentType(contentType);
    setIsInUpdate(false);
    toggleModal();
  };

  const openFormForUpdating = (data: Category | Bookmark): void => {
    setIsInUpdate(true);

    const instanceOfCategory = (object: any): object is Category => {
      return 'bookmarks' in object;
    };

    if (instanceOfCategory(data)) {
      setFormContentType(ContentType.category);
      setEditCategory(data);
    } else {
      setFormContentType(ContentType.bookmark);
      setEditBookmark(data);
    }

    toggleModal();
  };

  // Table actions
  const showTableForEditing = (contentType: ContentType) => {
    // We're in the edit mode and the same button was clicked - go back to list
    if (showTable && contentType === tableContentType) {
      setEditCategory(null);
      setShowTable(false);
    } else {
      setShowTable(true);
      setTableContentType(contentType);
    }
  };

  const finishEditing = () => {
    setShowTable(false);
    setEditCategory(null);
  };

  return (
    <Container>
      <Modal isOpen={modalIsOpen} setIsOpen={toggleModal}>
        <Form
          modalHandler={toggleModal}
          contentType={formContentType}
          inUpdate={isInUpdate}
        />
      </Modal>

      <Headline title="All Bookmarks" subtitle={<Link to="/">Go back</Link>} />

      {isAuthenticated && (
        <div className={classes.ActionsContainer}>
          <ActionButton
            name="Add Category"
            icon="mdiPlusBox"
            handler={() => openFormForAdding(ContentType.category)}
          />
          <ActionButton
            name="Add Bookmark"
            icon="mdiPlusBox"
            handler={() => openFormForAdding(ContentType.bookmark)}
          />
          <ActionButton
            name="Edit Categories"
            icon="mdiPencil"
            handler={() => showTableForEditing(ContentType.category)}
          />
          {showTable && tableContentType === ContentType.bookmark && (
            <ActionButton
              name="Finish Editing"
              icon="mdiPencil"
              handler={finishEditing}
            />
          )}
        </div>
      )}

      {categories.length && isAuthenticated && !showTable ? (
        <Message isPrimary={false}>
          Click on category name to edit its bookmarks
        </Message>
      ) : (
        <></>
      )}

      {loading ? (
        <Spinner />
      ) : !showTable ? (
        <BookmarkGrid categories={categories} searching={props.searching} />
      ) : (
        <Table
          contentType={tableContentType}
          openFormForUpdating={openFormForUpdating}
        />
      )}
    </Container>
  );
};
