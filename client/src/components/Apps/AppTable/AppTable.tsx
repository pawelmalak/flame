import { connect } from 'react-redux';
import { App, GlobalState } from '../../../interfaces';
import { pinApp, deleteApp } from '../../../store/actions';

import classes from './AppTable.module.css';
import Icon from '../../UI/Icons/Icon/Icon';

interface ComponentProps {
  apps: App[];
  pinApp: (id: number, isPinned: boolean) => void;
  deleteApp: (id: number) => void;
  updateAppHandler: (app: App) => void;
}

const AppTable = (props: ComponentProps): JSX.Element => {
  const deleteAppHandler = (app: App): void => {
    const proceed = window.confirm(`Are you sure you want to delete ${app.name} at ${app.url} ?`);

    if (proceed) {
      props.deleteApp(app.id);
    }
  }

  return (
    <div className={classes.TableContainer}>
      <table className={classes.Table}>
        <thead className={classes.TableHead}>
          <tr>
            <th>Name</th>
            <th>Url</th>
            <th>Icon</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={classes.TableBody}>
          {props.apps.map((app: App): JSX.Element => {
            return (
              <tr key={app.id}>
                <td>{app.name}</td>
                <td>{app.url}</td>
                <td>{app.icon}</td>
                <td className={classes.TableActions}>
                  <div
                    className={classes.TableAction}
                    onClick={() => deleteAppHandler(app)}>
                    <Icon icon='mdiDelete' />
                  </div>
                  <div
                    className={classes.TableAction}
                    onClick={() => props.updateAppHandler(app)}>
                    <Icon icon='mdiPencil' />
                  </div>
                  <div className={classes.TableAction} onClick={() => props.pinApp(app.id, app.isPinned)}>
                    {app.isPinned? <Icon icon='mdiPinOff' color='var(--color-accent)' /> : <Icon icon='mdiPin' />}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state: GlobalState) => {
  return {
    apps: state.app.apps
  }
}

export default connect(mapStateToProps, { pinApp, deleteApp })(AppTable);