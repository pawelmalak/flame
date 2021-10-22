import { Fragment, KeyboardEvent, useState, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import {
  pinApp,
  deleteApp,
  reorderApps,
  updateConfig,
  createNotification,
} from '../../../store/actions';

// Typescript
import { App, Config, GlobalState, NewNotification } from '../../../interfaces';

// CSS
import classes from './AppTable.module.css';

// UI
import Icon from '../../UI/Icons/Icon/Icon';
import Table from '../../UI/Table/Table';

interface ComponentProps {
  apps: App[];
  config: Config;
  pinApp: (app: App) => void;
  deleteApp: (id: number) => void;
  updateAppHandler: (app: App) => void;
  reorderApps: (apps: App[]) => void;
  updateConfig: (formData: any) => void;
  createNotification: (notification: NewNotification) => void;
}

const AppTable = (props: ComponentProps): JSX.Element => {
  const [localApps, setLocalApps] = useState<App[]>([]);
  const [isCustomOrder, setIsCustomOrder] = useState<boolean>(false);

  // Copy apps array
  useEffect(() => {
    setLocalApps([...props.apps]);
  }, [props.apps]);

  // Check ordering
  useEffect(() => {
    const order = props.config.useOrdering;

    if (order === 'orderId') {
      setIsCustomOrder(true);
    }
  }, []);

  const deleteAppHandler = (app: App): void => {
    const proceed = window.confirm(
      `Are you sure you want to delete ${app.name} at ${app.url} ?`
    );

    if (proceed) {
      props.deleteApp(app.id);
    }
  };

  // Support keyboard navigation for actions
  const keyboardActionHandler = (
    e: KeyboardEvent,
    app: App,
    handler: Function
  ) => {
    if (e.key === 'Enter') {
      handler(app);
    }
  };

  const dragEndHanlder = (result: DropResult): void => {
    if (!isCustomOrder) {
      props.createNotification({
        title: 'Error',
        message: 'Custom order is disabled',
      });
      return;
    }

    if (!result.destination) {
      return;
    }

    const tmpApps = [...localApps];
    const [movedApp] = tmpApps.splice(result.source.index, 1);
    tmpApps.splice(result.destination.index, 0, movedApp);

    setLocalApps(tmpApps);
    props.reorderApps(tmpApps);
  };

  return (
    <Fragment>
      <div className={classes.Message}>
        {isCustomOrder ? (
          <p>You can drag and drop single rows to reorder application</p>
        ) : (
          <p>
            Custom order is disabled. You can change it in{' '}
            <Link to="/settings/other">settings</Link>
          </p>
        )}
      </div>
      <DragDropContext onDragEnd={dragEndHanlder}>
        <Droppable droppableId="apps">
          {(provided) => (
            <Table
              headers={['Name', 'URL', 'Icon', 'Actions']}
              innerRef={provided.innerRef}
            >
              {localApps.map((app: App, index): JSX.Element => {
                return (
                  <Draggable
                    key={app.id}
                    draggableId={app.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      const style = {
                        border: snapshot.isDragging
                          ? '1px solid var(--color-accent)'
                          : 'none',
                        borderRadius: '4px',
                        ...provided.draggableProps.style,
                      };

                      return (
                        <tr
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          style={style}
                        >
                          <td style={{ width: '200px' }}>{app.name}</td>
                          <td style={{ width: '200px' }}>{app.url}</td>
                          <td style={{ width: '200px' }}>{app.icon}</td>
                          {!snapshot.isDragging && (
                            <td className={classes.TableActions}>
                              <div
                                className={classes.TableAction}
                                onClick={() => deleteAppHandler(app)}
                                onKeyDown={(e) =>
                                  keyboardActionHandler(
                                    e,
                                    app,
                                    deleteAppHandler
                                  )
                                }
                                tabIndex={0}
                              >
                                <Icon icon="mdiDelete" />
                              </div>
                              <div
                                className={classes.TableAction}
                                onClick={() => props.updateAppHandler(app)}
                                onKeyDown={(e) =>
                                  keyboardActionHandler(
                                    e,
                                    app,
                                    props.updateAppHandler
                                  )
                                }
                                tabIndex={0}
                              >
                                <Icon icon="mdiPencil" />
                              </div>
                              <div
                                className={classes.TableAction}
                                onClick={() => props.pinApp(app)}
                                onKeyDown={(e) =>
                                  keyboardActionHandler(e, app, props.pinApp)
                                }
                                tabIndex={0}
                              >
                                {app.isPinned ? (
                                  <Icon
                                    icon="mdiPinOff"
                                    color="var(--color-accent)"
                                  />
                                ) : (
                                  <Icon icon="mdiPin" />
                                )}
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    }}
                  </Draggable>
                );
              })}
            </Table>
          )}
        </Droppable>
      </DragDropContext>
    </Fragment>
  );
};

const mapStateToProps = (state: GlobalState) => {
  return {
    apps: state.app.apps,
    config: state.config.config,
  };
};

const actions = {
  pinApp,
  deleteApp,
  reorderApps,
  updateConfig,
  createNotification,
};

export default connect(mapStateToProps, actions)(AppTable);
