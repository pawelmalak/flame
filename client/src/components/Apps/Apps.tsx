import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { getApps, pinApp, addApp } from '../../store/actions';

// Typescript
import { App, GlobalState, NewApp } from '../../interfaces';

// CSS
import classes from './Apps.module.css';

// UI
import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headlines/Headline/Headline';
import Spinner from '../UI/Spinner/Spinner';
import ActionButton from '../UI/Buttons/ActionButton/ActionButton';
import Modal from '../UI/Modal/Modal';

// Subcomponents
import AppGrid from './AppGrid/AppGrid';
import AppForm from './AppForm/AppForm';
import AppTable from './AppTable/AppTable';

interface ComponentProps {
  getApps: Function;
  pinApp: (id: number, isPinned: boolean) => void;
  addApp: (formData: NewApp) => void;
  apps: App[];
  loading: boolean;
}

const Apps = (props: ComponentProps): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isInEdit, setIsInEdit] = useState(false);
  const [isInUpdate, setIsInUpdate] = useState(false);
  const [appInUpdate, setAppInUpdate] = useState<App>({
    name: 'string',
    url: 'string',
    icon: 'string',
    isPinned: false,
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  useEffect(() => {
    if (props.apps.length === 0) {
      props.getApps();
    }
  }, [props.getApps]);

  const toggleModal = (): void => {
    setModalIsOpen(!modalIsOpen);
    setIsInUpdate(false);
  }

  const toggleEdit = (): void => {
    setIsInEdit(!isInEdit);
    setIsInUpdate(false);
  }

  const toggleUpdate = (app: App): void => {
    setAppInUpdate(app);
    setIsInUpdate(true);
    setModalIsOpen(true);
  }

  return (
    <Container>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        {!isInUpdate
          ? <AppForm modalHandler={toggleModal} />
          : <AppForm modalHandler={toggleModal} app={appInUpdate} />
        }
      </Modal>

      <Headline
        title='All Applications'
        subtitle={(<Link to='/'>Go back</Link>)}
      />
      
      <div className={classes.ActionsContainer}>
        <ActionButton
          name='Add'
          icon='mdiPlusBox'
          handler={toggleModal}
        />
        <ActionButton
          name='Edit'
          icon='mdiPencil'
          handler={toggleEdit}
        />
      </div>

      <div className={classes.Apps}>
        {props.loading
          ? <Spinner />
          : (!isInEdit
              ? props.apps.length > 0
                ? <AppGrid apps={props.apps} />
                : <p className={classes.AppsMessage}>You don't have any applications. You can a new one from <Link to='/applications'>/application</Link> menu</p>
              : <AppTable updateAppHandler={toggleUpdate} />)
        }
      </div>
    </Container>
  )
}

const mapStateToProps = (state: GlobalState) => {
  return {
    apps: state.app.apps,
    loading: state.app.loading
  }
}

export default connect(mapStateToProps, { getApps, pinApp, addApp })(Apps);