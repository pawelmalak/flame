import { FormEvent, Fragment, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';
import { State } from '../../../store/reducers';

// UI
import { Button, InputGroup, SettingsHeadline } from '../../UI';

// CSS
import classes from './AppDetails.module.css';

// Utils
import { checkVersion } from '../../../utility';

export const AppDetails = (): JSX.Element => {
  const { isAuthenticated } = useSelector((state: State) => state.auth);

  const dispatch = useDispatch();
  const { login, logout } = bindActionCreators(actionCreators, dispatch);

  const [password, setPassword] = useState('');

  const formHandler = (e: FormEvent) => {
    e.preventDefault();
    login(password);
    setPassword('');
  };

  return (
    <Fragment>
      <SettingsHeadline text="Authentication" />
      {!isAuthenticated ? (
        <form onSubmit={formHandler}>
          <InputGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>
              See
              <a
                href="https://github.com/pawelmalak/flame/wiki/Authentication"
                target="blank"
              >
                {` project wiki `}
              </a>
              to read more about authentication
            </span>
          </InputGroup>

          <Button>Login</Button>
        </form>
      ) : (
        <div>
          <p className={classes.text}>
            You are logged in. Your session will expire <span>@@@@</span>
          </p>
          <Button click={logout}>Logout</Button>
        </div>
      )}

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
