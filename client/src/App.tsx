import 'external-svg-loader';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Apps } from './components/Apps/Apps';
import { Bookmarks } from './components/Bookmarks/Bookmarks';
import { Home } from './components/Home/Home';
import { NotificationCenter } from './components/NotificationCenter/NotificationCenter';
import { Settings } from './components/Settings/Settings';
import { Spinner } from './components/UI';
import { useAutoLogin, useLogout } from './state/auth';
import { configAtom, configLoadingAtom, useFetchConfig } from './state/config';
import { infoMessage, useCreateNotification } from './state/notification';
import { useFetchQueries } from './state/queries';
import { useFetchThemes, useSetTheme } from './state/theme';
import { decodeToken, parsePABToTheme, useCheckVersion } from './utility';

export const App = (): JSX.Element => {
  const autoLogin = useAutoLogin();

  // Validate token
  if (localStorage.token) {
    autoLogin();
  }

  const getConfig = useFetchConfig();
  const config = useAtomValue(configAtom);
  const loading = useAtomValue(configLoadingAtom);

  useEffect(() => {
    getConfig();
  }, []);

  const createNotification = useCreateNotification();
  const setTheme = useSetTheme();
  const fetchThemes = useFetchThemes();
  const fetchQueries = useFetchQueries();
  const checkVersion = useCheckVersion();

  const logout = useLogout();

  useEffect(() => {
    // check if token is valid
    const tokenIsValid = setInterval(() => {
      if (localStorage.token) {
        const expiresIn = decodeToken(localStorage.token).exp * 1000;
        const now = new Date().getTime();

        if (now > expiresIn) {
          logout();
          createNotification(
            infoMessage('Session expired. You have been logged out')
          );
        }
      }
    }, 1000);

    // load themes
    fetchThemes();

    // set user theme if present
    if (localStorage.theme) {
      setTheme(parsePABToTheme(localStorage.theme));
    }

    // check for updated
    checkVersion();

    // load custom search queries
    fetchQueries();

    return () => window.clearInterval(tokenIsValid);
  }, []);

  // If there is no user theme, set the default one
  useEffect(() => {
    if (!loading && !localStorage.theme) {
      setTheme(parsePABToTheme(config.defaultTheme), false);
    }
  }, [loading]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/applications" component={Apps} />
          <Route path="/bookmarks" component={Bookmarks} />
        </Switch>
      </BrowserRouter>
      <NotificationCenter />
    </>
  );
};
