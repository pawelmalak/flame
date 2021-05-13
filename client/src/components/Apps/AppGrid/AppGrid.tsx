import classes from './AppGrid.module.css';
import { App } from '../../../interfaces/App';

import AppCard from '../AppCard/AppCard';

interface ComponentProps {
  apps: App[];
}

const AppGrid = (props: ComponentProps): JSX.Element => {
  const apps = (
    <div className={classes.AppGrid}>
      {props.apps.map((app: App): JSX.Element => {
        return <AppCard
          key={app.id}
          app={app}
        />
      })}
    </div>
  );

  return apps;
}

export default AppGrid;