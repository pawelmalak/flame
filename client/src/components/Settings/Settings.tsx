import { NavLink, Link, Switch, Route, withRouter } from 'react-router-dom';

import classes from './Settings.module.css';

import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headlines/Headline/Headline';
import Themer from '../Themer/Themer';
import WeatherSettings from './WeatherSettings/WeatherSettings';

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
        </nav>
        <section className={classes.SettingsContent}>
          <Switch>
            <Route exact path='/settings' component={Themer} />
            <Route path='/settings/weather' component={WeatherSettings} />
          </Switch>
        </section>
      </div>
    </Container>
  )
}

export default withRouter(Settings);