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

  return (
    <Container>
      <Modal isOpen={modalIsOpen} setIsOpen={toggleModal}>
        <BookmarkForm modalHandler={toggleModal} contentType={formContentType} />
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
          ? <BookmarkGrid categories={props.categories} />
          : <BookmarkTable contentType={tableContentType} categories={props.categories} />)
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