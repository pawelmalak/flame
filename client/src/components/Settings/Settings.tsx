import { NavLink, Link, Switch, Route } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
import { State } from '../../store/reducers';

// Typescript
import { Route as SettingsRoute } from '../../interfaces';

// CSS
import classes from './Settings.module.css';

// Components
import { Themer } from './Themer/Themer';
import { WeatherSettings } from './WeatherSettings/WeatherSettings';
import { UISettings } from './UISettings/UISettings';
import { AppDetails } from './AppDetails/AppDetails';
import { StyleSettings } from './StyleSettings/StyleSettings';
import { GeneralSettings } from './GeneralSettings/GeneralSettings';
import { DockerSettings } from './DockerSettings/DockerSettings';
import { ProtectedRoute } from '../Routing/ProtectedRoute';

// UI
import { Container, Headline } from '../UI';

// Data
import { routes } from './settings.json';

export const Settings = (): JSX.Element => {
  const { isAuthenticated } = useSelector((state: State) => state.auth);

  const tabs = isAuthenticated ? routes : routes.filter((r) => !r.authRequired);

  return (
    <Container>
      <Headline title="Settings" subtitle={<Link to="/">Go back</Link>} />
      <div className={classes.Settings}>
        {/* NAVIGATION MENU */}
        <nav className={classes.SettingsNav}>
          {tabs.map(({ name, dest }: SettingsRoute, idx) => (
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
            <ProtectedRoute
              path="/settings/weather"
              component={WeatherSettings}
            />
            <ProtectedRoute
              path="/settings/general"
              component={GeneralSettings}
            />
            <ProtectedRoute path="/settings/interface" component={UISettings} />
            <ProtectedRoute
              path="/settings/docker"
              component={DockerSettings}
            />
            <ProtectedRoute path="/settings/css" component={StyleSettings} />
            <Route path="/settings/app" component={AppDetails} />
          </Switch>
        </section>
      </div>
    </Container>
  );
};
