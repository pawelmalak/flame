import { useAtomValue } from 'jotai';
import { authAtom } from '../../../state/auth';
import { useCheckVersion } from '../../../utility';
import { Button, SettingsHeadline } from '../../UI';
import classes from './AppDetails.module.css';
import { AuthForm } from './AuthForm/AuthForm';

export const AppDetails = (): JSX.Element => {
  const { isAuthenticated } = useAtomValue(authAtom);
  const checkVersion = useCheckVersion(true);

  return (
    <>
      <SettingsHeadline text="Authentication" />
      <AuthForm />

      {isAuthenticated && (
        <>
          <hr className={classes.separator} />

          <div>
            <SettingsHeadline text="App version" />
            <p className={classes.text}>
              <a
                href="https://github.com/GeorgeSG/flame"
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
                href="https://github.com/GeorgeSG/flame/blob/master/CHANGELOG.md"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>

            <Button click={checkVersion}>Check for updates</Button>
          </div>
        </>
      )}
    </>
  );
};
