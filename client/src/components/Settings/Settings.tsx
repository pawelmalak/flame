import { NavLink, Link, Switch, Route } from 'react-router-dom';

import classes from './Settings.module.css';

import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headlines/Headline/Headline';

import Themer from '../Themer/Themer';
import WeatherSettings from './WeatherSettings/WeatherSettings';
import OtherSettings from './OtherSettings/OtherSettings';
import AppDetails from './AppDetails/AppDetails';

const Settings = (): JSX.Element => {
  return (
    <Container>
      <Headline
        title='Settings'
        subtitle={<Link to='/'>Go back</Link>}
      />
      <div className={classes.Settings}>
        <nav className={classes.SettingsNav}>
          <NavLink
            className={classes.SettingsNavLink}
            activeClassName={classes.SettingsNavLinkActive}
            exact
            to='/settings'>
            Theme
          </NavLink>
          <NavLink
            className={classes.SettingsNavLink}
            activeClassName={classes.SettingsNavLinkActive}
            exact
            to='/settings/weather'>
            Weather
          </NavLink>
          <NavLink
            className={classes.SettingsNavLink}
            activeClassName={classes.SettingsNavLinkActive}
            exact
            to='/settings/other'>
            Other
          </NavLink>
          <NavLink
            className={classes.SettingsNavLink}
            activeClassName={classes.SettingsNavLinkActive}
            exact
            to='/settings/app'>
            App
          </NavLink>
        </nav>
        <section className={classes.SettingsContent}>
          <Switch>
            <Route exact path='/settings' component={Themer} />
            <Route path='/settings/weather' component={WeatherSettings} />
            <Route path='/settings/other' component={OtherSettings} />
            <Route path='/settings/app' component={AppDetails} />
          </Switch>
        </section>
      </div>
    </Container>
  )
}

export default Settings;