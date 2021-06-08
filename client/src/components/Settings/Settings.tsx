import { NavLink, Link, Switch, Route, withRouter } from 'react-router-dom';

import classes from './Settings.module.css';

import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headlines/Headline/Headline';
import Themer from '../Themer/Themer';
import WeatherSettings from './WeatherSettings/WeatherSettings';
import OtherSettings from './OtherSettings/OtherSettings';

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
        </nav>
        <section className={classes.SettingsContent}>
          <Switch>
            <Route exact path='/settings' component={Themer} />
            <Route path='/settings/weather' component={WeatherSettings} />
            <Route path='/settings/other' component={OtherSettings} />
          </Switch>
        </section>
      </div>
    </Container>
  )
}

export default withRouter(Settings);