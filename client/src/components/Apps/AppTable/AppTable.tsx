import { Fragment, KeyboardEvent, useState, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Typescript
import { App } from '../../../interfaces';

// CSS
import classes from './AppTable.module.css';

// UI
import { Icon, Table } from '../../UI';
import { State } from '../../../store/reducers';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';

interface Props {
  updateAppHandler: (app: App) => void;
}

export const AppTable = (props: Props): JSX.Element => {
  const {
    apps: { apps },
    config: { config },
  } = useSelector((state: State) => state);

  const dispatch = useDispatch();
  const { pinApp, deleteApp, reorderApps, updateConfig, createNotification } =
    bindActionCreators(actionCreators, dispatch);

  const [localApps, setLocalApps] = useState<App[]>([]);
  const [isCustomOrder, setIsCustomOrder] = useState<boolean>(false);

  // Copy apps array
  useEffect(() => {
    setLocalApps([...apps]);
  }, [apps]);

  // Check ordering
  useEffect(() => {
    const order = config.useOrdering;

    if (order === 'orderId') {
      setIsCustomOrder(true);
    }
  }, []);

  const deleteAppHandler = (app: App): void => {
    const proceed = window.confirm(
      `Are you sure you want to delete ${app.name} at ${app.url} ?`
    );

    if (proceed) {
      deleteApp(app.id);
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
      createNotification({
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
    reorderApps(tmpApps);
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
              headers={['Name', 'URL', 'Icon', 'Visibility', 'Actions']}
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
                          <td style={{ width: '200px' }}>
                            {app.isPublic ? 'Visible' : 'Hidden'}
                          </td>
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
                                onClick={() => pinApp(app)}
                                onKeyDown={(e) =>
                                  keyboardActionHandler(e, app, pinApp)
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
