import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import classes from './App.module.css';

import Apps from './components/Apps/Apps';
import Settings from './components/Settings/Settings';

import Icon from './components/UI/Icon/Icon';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Apps} />
        <Route exact path='/settings' component={Settings} />
      </Switch>
      <Link to='/settings' className={classes.SettingsButton}>
        <Icon icon='mdiCog' />
      </Link>
    </BrowserRouter>
  );
}

export default App;
