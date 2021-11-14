import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Typescript
import { App } from '../../interfaces';

// CSS
import classes from './Apps.module.css';

// UI
import { Headline, Spinner, ActionButton, Modal, Container } from '../UI';

// Subcomponents
import { AppGrid } from './AppGrid/AppGrid';
import { AppForm } from './AppForm/AppForm';
import { AppTable } from './AppTable/AppTable';

// Utils
import { appTemplate } from '../../utility';
import { State } from '../../store/reducers';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store';

interface Props {
  searching: boolean;
}

export const Apps = (props: Props): JSX.Element => {
  const {
    apps: { apps, loading },
    auth: { isAuthenticated },
  } = useSelector((state: State) => state);

  const dispatch = useDispatch();
  const { getApps } = bindActionCreators(actionCreators, dispatch);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isInEdit, setIsInEdit] = useState(false);
  const [isInUpdate, setIsInUpdate] = useState(false);
  const [appInUpdate, setAppInUpdate] = useState<App>(appTemplate);

  useEffect(() => {
    if (!apps.length) {
      getApps();
    }
  }, []);

  // observe if user is authenticated -> set default view if not
  useEffect(() => {
    if (!isAuthenticated) {
      setIsInEdit(false);
      setModalIsOpen(false);
    }
  }, [isAuthenticated]);

  const toggleModal = (): void => {
    setModalIsOpen(!modalIsOpen);
    setIsInUpdate(false);
  };

  const toggleEdit = (): void => {
    setIsInEdit(!isInEdit);
    setIsInUpdate(false);
  };

  const toggleUpdate = (app: App): void => {
    setAppInUpdate(app);
    setIsInUpdate(true);
    setModalIsOpen(true);
  };

  return (
    <Container>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        {!isInUpdate ? (
          <AppForm modalHandler={toggleModal} />
        ) : (
          <AppForm modalHandler={toggleModal} app={appInUpdate} />
        )}
      </Modal>

      <Headline
        title="All Applications"
        subtitle={<Link to="/">Go back</Link>}
      />

      {isAuthenticated && (
        <div className={classes.ActionsContainer}>
          <ActionButton name="Add" icon="mdiPlusBox" handler={toggleModal} />
          <ActionButton name="Edit" icon="mdiPencil" handler={toggleEdit} />
        </div>
      )}

      <div className={classes.Apps}>
        {loading ? (
          <Spinner />
        ) : !isInEdit ? (
          <AppGrid apps={apps} searching={props.searching} />
        ) : (
          <AppTable updateAppHandler={toggleUpdate} />
        )}
      </div>
    </Container>
  );
};
