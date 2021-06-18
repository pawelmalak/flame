import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getConfig, setTheme } from './store/actions';

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

// Get config pairs from database
store.dispatch<any>(getConfig());

// Set theme
if (localStorage.theme) {
  store.dispatch<any>(setTheme(localStorage.theme));
}

// Check for updates
checkVersion();

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/settings' component={Settings} />
          <Route path='/applications' component={Apps} />
          <Route path='/bookmarks' component={Bookmarks} />
        </Switch>
      </BrowserRouter>
      <NotificationCenter />
    </Provider>
  );
}

export default App;