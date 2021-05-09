import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { setTheme } from './store/actions';

// Redux
import store from './store/store';
import { Provider } from 'react-redux';

import classes from './App.module.css';

import Home from './components/Home/Home';
import Apps from './components/Apps/Apps';
import Settings from './components/Settings/Settings';

if (localStorage.theme) {
  store.dispatch(setTheme(localStorage.theme));
}

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
