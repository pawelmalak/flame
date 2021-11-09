import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { actionCreators } from './store';
import 'external-svg-loader';

// Utils
import { checkVersion } from './utility';

// Routes
import { Home } from './components/Home/Home';
import { Apps } from './components/Apps/Apps';
import { Settings } from './components/Settings/Settings';
import { Bookmarks } from './components/Bookmarks/Bookmarks';
import { NotificationCenter } from './components/NotificationCenter/NotificationCenter';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react';

const App = (): JSX.Element => {
  const dispath = useDispatch();
  const { fetchQueries, getConfig, setTheme } = bindActionCreators(
    actionCreators,
    dispath
  );

  useEffect(() => {
    getConfig();

    if (localStorage.theme) {
      setTheme(localStorage.theme);
    }

    checkVersion();

    fetchQueries();
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

export default App;
