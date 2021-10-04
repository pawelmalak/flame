//
import { NavLink, Link, Switch, Route } from 'react-router-dom';

// Typescript
import { Route as SettingsRoute } from '../../interfaces';

// CSS
import classes from './Settings.module.css';

// Components
import Themer from '../Themer/Themer';
import WeatherSettings from './WeatherSettings/WeatherSettings';
import OtherSettings from './OtherSettings/OtherSettings';
import AppDetails from './AppDetails/AppDetails';
import StyleSettings from './StyleSettings/StyleSettings';
import SearchSettings from './SearchSettings/SearchSettings';

// UI
import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headlines/Headline/Headline';

// Data
import { routes } from './settings.json';

const Settings = (): JSX.Element => {
  return (
    <Container>
      <Headline title="Settings" subtitle={<Link to="/">Go back</Link>} />
      <div className={classes.Settings}>
        {/* NAVIGATION MENU */}
        <nav className={classes.SettingsNav}>
          {routes.map(({ name, dest }: SettingsRoute, idx) => (
            <NavLink
              className={classes.SettingsNavLink}
              activeClassName={classes.SettingsNavLinkActive}
              exact
              to={dest}
              key={idx}
            >
              {name}
            </NavLink>
          ))}
        </nav>

        {/* ROUTES */}
        <section className={classes.SettingsContent}>
          <Switch>
            <Route exact path="/settings" component={Themer} />
            <Route path="/settings/weather" component={WeatherSettings} />
            <Route path="/settings/search" component={SearchSettings} />
            <Route path="/settings/other" component={OtherSettings} />
            <Route path="/settings/css" component={StyleSettings} />
            <Route path="/settings/app" component={AppDetails} />
          </Switch>
        </section>
      </div>
    </Container>
  );
};

export default Settings;
