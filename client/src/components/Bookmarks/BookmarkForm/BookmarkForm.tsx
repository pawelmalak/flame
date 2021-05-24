import { useState, SyntheticEvent, Fragment, ChangeEvent, useEffect } from 'react';
import { connect } from 'react-redux';

import ModalForm from '../../UI/Forms/ModalForm/ModalForm';
import InputGroup from '../../UI/Forms/InputGroup/InputGroup';
import { Category, GlobalState, NewBookmark, NewCategory } from '../../../interfaces';
import { FormContentType } from '../Bookmarks';
import { getCategories, addCategory, addBookmark } from '../../../store/actions';

interface ComponentProps {
  modalHandler: () => void;
  contentType: FormContentType;
  categories: Category[];
  addCategory: (formData: NewCategory) => void;
  addBookmark: (formData: NewBookmark) => void;
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

  const formSubmitHandler = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (props.contentType === FormContentType.category) {
      props.addCategory(categoryName);
      setCategoryName({ name: '' });
    } else if (props.contentType === FormContentType.bookmark) {
      if (formData.categoryId === -1) {
        alert('select category');
        return;
      }

      props.addBookmark(formData);
      setFormData({
        name: '',
        url: '',
        categoryId: formData.categoryId
      })
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

  return (
    <ModalForm
      modalHandler={props.modalHandler}
      formHandler={formSubmitHandler}
    >
      {props.contentType === FormContentType.category
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
      <button type='submit'>add</button>
    </ModalForm>
  )
}

const mapStateToProps = (state: GlobalState) => {
  return {
    categories: state.bookmark.categories
  }
}

export default connect(mapStateToProps, { getCategories, addCategory, addBookmark })(BookmarkForm);