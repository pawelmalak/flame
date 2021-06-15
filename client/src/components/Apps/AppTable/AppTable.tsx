import { KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { App, GlobalState } from '../../../interfaces';
import { pinApp, deleteApp, reorderApp } from '../../../store/actions';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import classes from './AppTable.module.css';
import Icon from '../../UI/Icons/Icon/Icon';
import Table from '../../UI/Table/Table';

interface ComponentProps {
  apps: App[];
  pinApp: (app: App) => void;
  deleteApp: (id: number) => void;
  updateAppHandler: (app: App) => void;
  reorderApp: (apps: App[]) => void;
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

  const dragEndHanlder = (result: DropResult): void => {
    console.log(result);

    if (!result.destination) {
      return;
    }

    const tmpApps = [...props.apps];
    const [movedApp] = tmpApps.splice(result.source.index, 1);
    tmpApps.splice(result.destination.index, 0, movedApp);

    props.reorderApp(tmpApps);
  }

  return (
    <DragDropContext onDragEnd={dragEndHanlder}>
      <Droppable droppableId='apps'>
        {(provided) => (
          <Table headers={[
            'Name',
            'URL',
            'Icon',
            'Actions'
          ]}
          innerRef={provided.innerRef}>
            {props.apps.map((app: App, index): JSX.Element => {
              return (
                <Draggable key={app.id} draggableId={app.id.toString()} index={index}>
                  {(provided, snapshot) => {
                    const style = {
                      border: snapshot.isDragging ? '1px solid var(--color-accent)' : 'none',
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
                        <td style={{width:'200px'}}>{app.name}</td>
                        <td style={{width:'200px'}}>{app.url}</td>
                        <td style={{width:'200px'}}>{app.icon}</td>
                        {!snapshot.isDragging && (
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
                        )}
                      </tr>
                    )
                  }}
                </Draggable>
              )
            })}
          </Table>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const mapStateToProps = (state: GlobalState) => {
  return {
    apps: state.app.apps
  }
}

export default connect(mapStateToProps, { pinApp, deleteApp, reorderApp })(AppTable);