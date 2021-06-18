import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories } from '../../store/actions';

import classes from './Bookmarks.module.css';

import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headlines/Headline/Headline';
import ActionButton from '../UI/Buttons/ActionButton/ActionButton';

import BookmarkGrid from './BookmarkGrid/BookmarkGrid';
import { Category, GlobalState, Bookmark } from '../../interfaces';
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
  const {
    getCategories,
    categories,
    loading
  } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formContentType, setFormContentType] = useState(ContentType.category);
  const [isInEdit, setIsInEdit] = useState(false);
  const [tableContentType, setTableContentType] = useState(ContentType.category);
  const [isInUpdate, setIsInUpdate] = useState(false);
  const [categoryInUpdate, setCategoryInUpdate] = useState<Category>({
    name: '',
    id: -1,
    isPinned: false,
    orderId: 0,
    bookmarks: [],
    createdAt: new Date(),
    updatedAt: new Date()
  })
  const [bookmarkInUpdate, setBookmarkInUpdate] = useState<Bookmark>({
    name: '',
    url: '',
    categoryId: -1,
    icon: '',
    id: -1,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, [getCategories])

  const toggleModal = (): void => {
    setModalIsOpen(!modalIsOpen);
  }

  const addActionHandler = (contentType: ContentType) => {
    setFormContentType(contentType);
    setIsInUpdate(false);
    toggleModal();
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

  const instanceOfCategory = (object: any): object is Category => {
    return 'bookmarks' in object;
  }

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
  }

  return (
    <Container>
      <Modal isOpen={modalIsOpen} setIsOpen={toggleModal}>
        {!isInUpdate
          ? <BookmarkForm modalHandler={toggleModal} contentType={formContentType} />
          : formContentType === ContentType.category
            ? <BookmarkForm modalHandler={toggleModal} contentType={formContentType} category={categoryInUpdate} />
            : <BookmarkForm modalHandler={toggleModal} contentType={formContentType} bookmark={bookmarkInUpdate} />
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

      {loading
        ? <Spinner />
        : (!isInEdit
          ? <BookmarkGrid categories={categories} />
          : <BookmarkTable
              contentType={tableContentType}
              categories={categories}
              updateHandler={goToUpdateMode}
            />
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