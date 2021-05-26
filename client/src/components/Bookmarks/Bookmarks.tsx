import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories } from '../../store/actions';

import classes from './Bookmarks.module.css';

import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headlines/Headline/Headline';
import ActionButton from '../UI/Buttons/ActionButton/ActionButton';

import BookmarkGrid from './BookmarkGrid/BookmarkGrid';
import { Category, GlobalState } from '../../interfaces';
import Spinner from '../UI/Spinner/Spinner';
import Modal from '../UI/Modal/Modal';
import BookmarkForm from './BookmarkForm/BookmarkForm';
import BookmarkTable from './BookmarkTable/BookmarkTable';

interface ComponentProps {
  loading: boolean;
  categories: Category[];
  getCategories: () => void;
}

export enum ContentType {
  category,
  bookmark
}

const Bookmarks = (props: ComponentProps): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formContentType, setFormContentType] = useState(ContentType.category);
  const [isInEdit, setIsInEdit] = useState(false);
  const [tableContentType, setTableContentType] = useState(ContentType.category);
  const [isInUpdate, setIsInUpdate] = useState(false);
  const [categoryInUpdate, setCategoryInUpdate] = useState<Category>({
    name: '',
    id: -1,
    isPinned: false,
    bookmarks: [],
    createdAt: new Date(),
    updatedAt: new Date()
  })

  useEffect(() => {
    if (props.categories.length === 0) {
      props.getCategories();
    }
  }, [props.getCategories])

  const toggleModal = (): void => {
    setModalIsOpen(!modalIsOpen);
  }

  const addActionHandler = (contentType: ContentType) => {
    setFormContentType(contentType);
    setIsInUpdate(false);
    toggleModal();
  }

  const toggleEdit = (): void => {
    setIsInEdit(!isInEdit);
  }

  const editActionHandler = (contentType: ContentType) => {
    // We're in the edit mode and the same button was clicked - go back to list
    if (isInEdit && contentType === tableContentType) {
      setIsInEdit(false);
    } else {
      setIsInEdit(true);
      setTableContentType(contentType);
    }
  }

  const goToUpdateMode = (category: Category): void => {
    setIsInUpdate(true);
    setCategoryInUpdate(category);
    toggleModal();
  }

  let modalForm: JSX.Element;

  return (
    <Container>
      <Modal isOpen={modalIsOpen} setIsOpen={toggleModal}>
        {!isInUpdate
          ? <BookmarkForm modalHandler={toggleModal} contentType={formContentType} />
          : <BookmarkForm modalHandler={toggleModal} contentType={formContentType} category={categoryInUpdate} />
        }
      </Modal>

      <Headline
        title='All Bookmarks'
        subtitle={(<Link to='/'>Go back</Link>)}
      />
      
      <div className={classes.ActionsContainer}>
        <ActionButton
          name='Add Category'
          icon='mdiPlusBox'
          handler={() => addActionHandler(ContentType.category)}
        />
        <ActionButton
          name='Add Bookmark'
          icon='mdiPlusBox'
          handler={() => addActionHandler(ContentType.bookmark)}
        />
        <ActionButton
          name='Edit Categories'
          icon='mdiPencil'
          handler={() => editActionHandler(ContentType.category)}
        />
        <ActionButton
          name='Edit Bookmarks'
          icon='mdiPencil'
          handler={() => editActionHandler(ContentType.bookmark)}
        />
      </div>

      {props.loading
        ? <Spinner />
        : (!isInEdit
          ? props.categories.length > 0
            ? <BookmarkGrid categories={props.categories} />
            : <p className={classes.BookmarksMessage}>You don't have any bookmarks. You can add a new one from <Link to='/bookmarks'>/bookmarks</Link> menu</p>
          : (<BookmarkTable
              contentType={tableContentType}
              categories={props.categories}
              updateCategoryHandler={goToUpdateMode}
            />)
          )
      }
    </Container>
  )
}

const mapStateToProps = (state: GlobalState) => {
  return {
    loading: state.bookmark.loading,
    categories: state.bookmark.categories
  }
}

export default connect(mapStateToProps, { getCategories })(Bookmarks);