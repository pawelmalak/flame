import { KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { App, GlobalState } from '../../../interfaces';
import { pinApp, deleteApp } from '../../../store/actions';

import classes from './AppTable.module.css';
import Icon from '../../UI/Icons/Icon/Icon';
import Table from '../../UI/Table/Table';

interface ComponentProps {
  apps: App[];
  pinApp: (app: App) => void;
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

  const keyboardActionHandler = (e: KeyboardEvent, app: App, handler: Function) => {
    if (e.key === 'Enter') {
      handler(app);
    }
  }

  return (
    <Table headers={[
      'Name',
      'URL',
      'Icon',
      'Actions'
    ]}>
      {props.apps.map((app: App): JSX.Element => {
        return (
          <tr key={app.id}>
            <td>{app.name}</td>
            <td>{app.url}</td>
            <td>{app.icon}</td>
            <td className={classes.TableActions}>
              <div
                className={classes.TableAction}
                onClick={() => deleteAppHandler(app)}
                onKeyDown={(e) => keyboardActionHandler(e, app, deleteAppHandler)}
                tabIndex={0}>
                <Icon icon='mdiDelete' />
              </div>
              <div
                className={classes.TableAction}
                onClick={() => props.updateAppHandler(app)}
                onKeyDown={(e) => keyboardActionHandler(e, app, props.updateAppHandler)}
                tabIndex={0}>
                <Icon icon='mdiPencil' />
              </div>
              <div
                className={classes.TableAction}
                onClick={() => props.pinApp(app)}
                onKeyDown={(e) => keyboardActionHandler(e, app, props.pinApp)}
                tabIndex={0}>
                {app.isPinned
                  ? <Icon icon='mdiPinOff' color='var(--color-accent)' />
                  : <Icon icon='mdiPin' />
                }
              </div>
            </td>
          </tr>
        )
      })}
    </Table>
  )
}

const mapStateToProps = (state: GlobalState) => {
  return {
    apps: state.app.apps
  }
}

export default connect(mapStateToProps, { pinApp, deleteApp })(AppTable);