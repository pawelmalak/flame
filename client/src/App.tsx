import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { actionCreators } from './store';
import 'external-svg-loader';

// Utils
import { checkVersion, decodeToken } from './utility';

// Routes
import { Home } from './components/Home/Home';
import { Apps } from './components/Apps/Apps';
import { Settings } from './components/Settings/Settings';
import { Bookmarks } from './components/Bookmarks/Bookmarks';
import { NotificationCenter } from './components/NotificationCenter/NotificationCenter';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react';

export const App = (): JSX.Element => {
  const dispath = useDispatch();
  const {
    fetchQueries,
    getConfig,
    setTheme,
    logout,
    createNotification,
    autoLogin,
  } = bindActionCreators(actionCreators, dispath);

  useEffect(() => {
    // login if token exists
    if (localStorage.token) {
      autoLogin();
    }

    // check if token is valid
    const tokenIsValid = setInterval(() => {
      if (localStorage.token) {
        const expiresIn = decodeToken(localStorage.token).exp * 1000;
        const now = new Date().getTime();

        if (now > expiresIn) {
          logout();
          createNotification({
            title: 'Info',
            message: 'Session expired. You have been logged out',
          });
        }
      }
    }, 1000);

    // load app config
    getConfig();

    // set theme
    if (localStorage.theme) {
      setTheme(localStorage.theme);
    }

    // check for updated
    checkVersion();

    // load custom search queries
    fetchQueries();

    return () => window.clearInterval(tokenIsValid);
  }, []);

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
