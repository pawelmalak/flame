import { Fragment } from 'react';

// UI
import { Button, SettingsHeadline } from '../../UI';
import { AuthForm } from './AuthForm/AuthForm';
import classes from './AppDetails.module.css';

// Store
import { useSelector } from 'react-redux';
import { State } from '../../../store/reducers';

// Other
import { checkVersion } from '../../../utility';

export const AppDetails = (): JSX.Element => {
  const { isAuthenticated } = useSelector((state: State) => state.auth);

  return (
    <Fragment>
      <SettingsHeadline text="Authentication" />
      <AuthForm />

      {isAuthenticated && (
        <Fragment>
          <hr className={classes.separator} />

          <div>
            <SettingsHeadline text="App version" />
            <p className={classes.text}>
              <a
                href="https://github.com/pawelmalak/flame"
                target="_blank"
                rel="noreferrer"
              >
                Flame
              </a>{' '}
              version {process.env.REACT_APP_VERSION}
            </p>

            <p className={classes.text}>
              See changelog{' '}
              <a
                href="https://github.com/pawelmalak/flame/blob/master/CHANGELOG.md"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>

            <Button click={() => checkVersion(true)}>Check for updates</Button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
