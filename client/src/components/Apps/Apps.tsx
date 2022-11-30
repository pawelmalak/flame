import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { App } from '../../interfaces';
import {
  appInUpdateAtom,
  appsAtom,
  appsLoadingAtom,
  useFetchApps,
} from '../../state/app';
import { authAtom } from '../../state/auth';
import { ActionButton, Container, Headline, Modal, Spinner } from '../UI';
import { AppForm } from './AppForm/AppForm';
import { AppGrid } from './AppGrid/AppGrid';
import classes from './Apps.module.css';
import { AppTable } from './AppTable/AppTable';

interface Props {
  searching: boolean;
}

export const Apps = (props: Props): JSX.Element => {
  const { isAuthenticated } = useAtomValue(authAtom);

  const apps = useAtomValue(appsAtom);
  const setEditApp = useSetAtom(appInUpdateAtom);
  const loading = useAtomValue(appsLoadingAtom);
  const fetchApps = useFetchApps();

  // Load apps if array is empty
  useEffect(() => {
    if (!apps.length) {
      fetchApps();
    }
  }, []);

  // Form
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

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
  };

  const toggleEdit = (): void => {
    setShowTable(!showTable);
  };

  const openFormForUpdating = (app: App): void => {
    setEditApp(app);
    setModalIsOpen(true);
  };

  return (
    <Container>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <AppForm modalHandler={toggleModal} />
      </Modal>

      <Headline
        title="All Applications"
        subtitle={<Link to="/">Go back</Link>}
      />

      {isAuthenticated && (
        <div className={classes.ActionsContainer}>
          <ActionButton
            name="Add"
            icon="mdiPlusBox"
            handler={() => {
              setEditApp(null);
              toggleModal();
            }}
          />
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
