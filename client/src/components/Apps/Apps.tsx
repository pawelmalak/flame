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
  // Get Redux state
  const {
    apps: { apps, loading },
    auth: { isAuthenticated },
  } = useSelector((state: State) => state);

  // Get Redux action creators
  const dispatch = useDispatch();
  const { getApps } = bindActionCreators(actionCreators, dispatch);

  // Load apps if array is empty
  useEffect(() => {
    if (!apps.length) {
      getApps();
    }
  }, []);

  // Form
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [isInUpdate, setIsInUpdate] = useState(false);
  const [appInUpdate, setAppInUpdate] = useState<App>(appTemplate);

  // Observe if user is authenticated -> set default view if not
  useEffect(() => {
    if (!isAuthenticated) {
      setShowTable(false);
      setModalIsOpen(false);
    }
  }, [isAuthenticated]);

  // Form actions
  const toggleModal = (): void => {
    setModalIsOpen(!modalIsOpen);
    setIsInUpdate(false);
  };

  const toggleEdit = (): void => {
    setShowTable(!showTable);
    setIsInUpdate(false);
  };

  const openFormForUpdating = (app: App): void => {
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
        ) : !showTable ? (
          <AppGrid apps={apps} searching={props.searching} />
        ) : (
          <AppTable openFormForUpdating={openFormForUpdating} />
        )}
      </div>
    </Container>
  );
};
