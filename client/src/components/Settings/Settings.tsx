import { useAtomValue } from 'jotai';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import { Route as SettingsRoute } from '../../interfaces';
import { authAtom } from '../../state/auth';
import { ProtectedRoute } from '../Routing/ProtectedRoute';
import { Container, Headline } from '../UI';
import { AppDetails } from './AppDetails/AppDetails';
import { DockerSettings } from './DockerSettings/DockerSettings';
import { GeneralSettings } from './GeneralSettings/GeneralSettings';
import { routes } from './settings.json';
import classes from './Settings.module.css';
import { StyleSettings } from './StyleSettings/StyleSettings';
import { Themer } from './Themer/Themer';
import { UISettings } from './UISettings/UISettings';
import { WeatherSettings } from './WeatherSettings/WeatherSettings';

export const Settings = (): JSX.Element => {
  const { isAuthenticated } = useAtomValue(authAtom);

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
