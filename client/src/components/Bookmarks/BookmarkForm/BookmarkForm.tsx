import { useState, SyntheticEvent, Fragment, ChangeEvent, useEffect } from 'react';
import { connect } from 'react-redux';

import ModalForm from '../../UI/Forms/ModalForm/ModalForm';
import InputGroup from '../../UI/Forms/InputGroup/InputGroup';
import { Bookmark, Category, GlobalState, NewBookmark, NewCategory, NewNotification } from '../../../interfaces';
import { ContentType } from '../Bookmarks';
import { getCategories, addCategory, addBookmark, updateCategory, updateBookmark, createNotification } from '../../../store/actions';
import Button from '../../UI/Buttons/Button/Button';

interface ComponentProps {
  modalHandler: () => void;
  contentType: ContentType;
  categories: Category[];
  category?: Category;
  bookmark?: Bookmark;
  addCategory: (formData: NewCategory) => void;
  addBookmark: (formData: NewBookmark) => void;
  updateCategory: (id: number, formData: NewCategory) => void;
  updateBookmark: (id: number, formData: NewBookmark) => void;
  createNotification: (notification: NewNotification) => void;
}

const BookmarkForm = (props: ComponentProps): JSX.Element => {
  const [categoryName, setCategoryName] = useState<NewCategory>({
    name: ''
  })

  const [formData, setFormData] = useState<NewBookmark>({
    name: '',
    url: '',
    categoryId: -1
  })

  useEffect(() => {
    if (props.category) {
      setCategoryName({ name: props.category.name });
    } else {
      setCategoryName({ name: '' });
    }
  }, [props.category])

  useEffect(() => {
    if (props.bookmark) {
      setFormData({
        name: props.bookmark.name,
        url: props.bookmark.url,
        categoryId: props.bookmark.categoryId
      })
    } else {
      setFormData({
        name: '',
        url: '',
        categoryId: -1
      })
    }
  }, [props.bookmark])

  const formSubmitHandler = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!props.category && !props.bookmark) {
      // Add new
      if (props.contentType === ContentType.category) {
        // Add category
        props.addCategory(categoryName);
        setCategoryName({ name: '' });
      } else if (props.contentType === ContentType.bookmark) {
        // Add bookmark
        if (formData.categoryId === -1) {
          props.createNotification({
            title: 'Error',
            message: 'Please select category'
          })
          return;
        }
  
        props.addBookmark(formData);
        setFormData({
          name: '',
          url: '',
          categoryId: formData.categoryId
        })
      }
    } else {
      // Update
      if (props.contentType === ContentType.category && props.category) {
        // Update category
        props.updateCategory(props.category.id, categoryName);
        setCategoryName({ name: '' });
      } else if (props.contentType === ContentType.bookmark && props.bookmark) {
        // Update bookmark
        props.updateBookmark(props.bookmark.id, formData);
        setFormData({
          name: '',
          url: '',
          categoryId: -1
        })
      }

      props.modalHandler();
    }
  }

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFormData({
      ...formData,
      categoryId: parseInt(e.target.value)
    })
  }

  let button = <Button>Submit</Button>

  if (!props.category && !props.bookmark) {
    if (props.contentType === ContentType.category) {
      button = <Button>Add new category</Button>;
    } else {
      button = <Button>Add new bookmark</Button>;
    }
  } else if (props.category) {
    button = <Button>Update category</Button>
  } else if (props.bookmark) {
    button = <Button>Update bookmark</Button>
  }

  return (
    <ModalForm
      modalHandler={props.modalHandler}
      formHandler={formSubmitHandler}
    >
      {props.contentType === ContentType.category
        ? (
          <Fragment>
            <InputGroup>
              <label htmlFor='categoryName'>Category Name</label>
              <input
                type='text'
                name='categoryName'
                id='categoryName'
                placeholder='Social Media'
                required
                value={categoryName.name}
                onChange={(e) => setCategoryName({ name: e.target.value })}
              />
            </InputGroup>
          </Fragment>
        )
        : (
          <Fragment>
            <InputGroup>
              <label htmlFor='name'>Bookmark Name</label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Reddit'
                required
                value={formData.name}
                onChange={(e) => inputChangeHandler(e)}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor='url'>Bookmark URL</label>
              <input
                type='text'
                name='url'
                id='url'
                placeholder='reddit.com'
                required
                value={formData.url}
                onChange={(e) => inputChangeHandler(e)}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor='categoryId'>Bookmark Category</label>
              <select
                name='categoryId'
                id='categoryId'
                required
                onChange={(e) => selectChangeHandler(e)}
                value={formData.categoryId}
              >
                <option value={-1}>Select category</option>
                {props.categories.map((category: Category): JSX.Element => {
                  return (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  )
                })}
              </select>
            </InputGroup>
          </Fragment>
        )
      }
      {button}
    </ModalForm>
  )
}

const mapStateToProps = (state: GlobalState) => {
  return {
    categories: state.bookmark.categories
  }
}

const dispatchMap = {
  getCategories,
  addCategory,
  addBookmark,
  updateCategory,
  updateBookmark,
  createNotification
}

export default connect(mapStateToProps, dispatchMap)(BookmarkForm);