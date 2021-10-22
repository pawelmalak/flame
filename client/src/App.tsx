import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { fetchQueries, getConfig, setTheme } from './store/actions';
import 'external-svg-loader';

// Redux
import { store } from './store/store';
import { Provider } from 'react-redux';

// Utils
import { checkVersion } from './utility';

// Routes
import Home from './components/Home/Home';
import Apps from './components/Apps/Apps';
import Settings from './components/Settings/Settings';
import Bookmarks from './components/Bookmarks/Bookmarks';
import NotificationCenter from './components/NotificationCenter/NotificationCenter';

// Load config
store.dispatch<any>(getConfig());

// Set theme
if (localStorage.theme) {
  store.dispatch<any>(setTheme(localStorage.theme));
}

// Check for updates
checkVersion();

// fetch queries
store.dispatch<any>(fetchQueries());

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/applications" component={Apps} />
          <Route path="/bookmarks" component={Bookmarks} />
        </Switch>
      </BrowserRouter>
      <NotificationCenter />
    </Provider>
  );
};

export default App;
