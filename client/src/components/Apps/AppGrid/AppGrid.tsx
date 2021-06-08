import classes from './AppGrid.module.css';
import { Link } from 'react-router-dom';
import { App } from '../../../interfaces/App';

import AppCard from '../AppCard/AppCard';

interface ComponentProps {
  apps: App[];
}

const AppGrid = (props: ComponentProps): JSX.Element => {
  let apps: JSX.Element;

  if (props.apps.length > 0) {
    apps = (
      <div className={classes.AppGrid}>
        {props.apps.map((app: App): JSX.Element => {
          return <AppCard
            key={app.id}
            app={app}
          />
        })}
      </div>
    )
  } else {
    apps = (
      <p className={classes.AppsMessage}>You don't have any applications. You can add a new one from <Link to='/applications'>/application</Link> menu</p>
    );
  }

  return apps;
}

export default AppGrid;