import { Fragment } from 'react';
import { Button, SettingsHeadline } from '../../UI';
import classes from './AppDetails.module.css';
import { checkVersion } from '../../../utility';
import { AuthForm } from './AuthForm/AuthForm';

export const AppDetails = (): JSX.Element => {
  return (
    <Fragment>
      <SettingsHeadline text="Authentication" />
      <AuthForm />

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
  );
};
