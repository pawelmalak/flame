import { useEffect } from 'react';
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

interface ComponentProps {
  loading: boolean;
  categories: Category[];
  getCategories: () => void;
}

const Bookmarks = (props: ComponentProps): JSX.Element => {
  useEffect(() => {
    if (props.categories.length === 0) {
      props.getCategories();
    }
  }, [props.getCategories])

  return (
    <Container>
      <Headline
        title='All Bookmarks'
        subtitle={(<Link to='/'>Go back</Link>)}
      />
      
      <div className={classes.ActionsContainer}>
        <ActionButton
          name='Add'
          icon='mdiPlusBox'
        />
        <ActionButton
          name='Edit'
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