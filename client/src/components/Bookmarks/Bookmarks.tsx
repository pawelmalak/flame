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

interface ComponentProps {
  loading: boolean;
  categories: Category[];
  getCategories: () => void;
}

export enum FormContentType {
  category,
  bookmark
}

const Bookmarks = (props: ComponentProps): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formContentType, setFormContentType] = useState(FormContentType.category);

  useEffect(() => {
    if (props.categories.length === 0) {
      props.getCategories();
    }
  }, [props.getCategories])

  const toggleModal = (): void => {
    setModalIsOpen(!modalIsOpen);
  }

  const addActionHandler = (contentType: FormContentType) => {
    setFormContentType(contentType);
    toggleModal();
  }

  return (
    <Container>
      <Modal isOpen={modalIsOpen} setIsOpen={toggleModal}>
        {formContentType === FormContentType.category
          ? <BookmarkForm
              modalHandler={toggleModal}
              contentType={FormContentType.category}
            />
          : <BookmarkForm
              modalHandler={toggleModal}
              contentType={FormContentType.bookmark}
            />
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
          handler={() => addActionHandler(FormContentType.category)}
        />
        <ActionButton
          name='Add Bookmark'
          icon='mdiPlusBox'
          handler={() => addActionHandler(FormContentType.bookmark)}
        />
        <ActionButton
          name='Edit Categories'
          icon='mdiPencil'
        />
        <ActionButton
          name='Edit Bookmarks'
          icon='mdiPencil'
        />
      </div>

      {props.loading
        ? <Spinner />
        : <BookmarkGrid categories={props.categories} />
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