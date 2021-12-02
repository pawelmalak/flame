import { useState, useEffect, Fragment } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../store/reducers';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';

// Typescript
import { Bookmark, Category } from '../../../interfaces';

// UI
import { Message, Table } from '../../UI';
import { TableActions } from '../../Actions/TableActions';
import { bookmarkTemplate } from '../../../utility';

interface Props {
  openFormForUpdating: (data: Category | Bookmark) => void;
}

export const BookmarksTable = ({ openFormForUpdating }: Props): JSX.Element => {
  const {
    bookmarks: { categoryInEdit },
    config: { config },
  } = useSelector((state: State) => state);

  const dispatch = useDispatch();
  const {
    deleteBookmark,
    updateBookmark,
    createNotification,
    reorderBookmarks,
  } = bindActionCreators(actionCreators, dispatch);

  const [localBookmarks, setLocalBookmarks] = useState<Bookmark[]>([]);

  // Copy bookmarks array
  useEffect(() => {
    if (categoryInEdit) {
      setLocalBookmarks([...categoryInEdit.bookmarks]);
    }
  }, [categoryInEdit]);

  // Drag and drop handler
  const dragEndHanlder = (result: DropResult): void => {
    if (config.useOrdering !== 'orderId') {
      createNotification({
        title: 'Error',
        message: 'Custom order is disabled',
      });
      return;
    }

    if (!result.destination) {
      return;
    }

    const tmpBookmarks = [...localBookmarks];
    const [movedBookmark] = tmpBookmarks.splice(result.source.index, 1);
    tmpBookmarks.splice(result.destination.index, 0, movedBookmark);

    setLocalBookmarks(tmpBookmarks);

    const categoryId = categoryInEdit?.id || -1;
    reorderBookmarks(tmpBookmarks, categoryId);
  };

  // Action hanlders
  const deleteBookmarkHandler = (id: number, name: string) => {
    const categoryId = categoryInEdit?.id || -1;

    const proceed = window.confirm(`Are you sure you want to delete ${name}?`);
    if (proceed) {
      deleteBookmark(id, categoryId);
    }
  };

  const updateBookmarkHandler = (id: number) => {
    const bookmark =
      categoryInEdit?.bookmarks.find((b) => b.id === id) || bookmarkTemplate;

    openFormForUpdating(bookmark);
  };

  const changeBookmarkVisibiltyHandler = (id: number) => {
    const bookmark =
      categoryInEdit?.bookmarks.find((b) => b.id === id) || bookmarkTemplate;

    const categoryId = categoryInEdit?.id || -1;
    const [prev, curr] = [categoryId, categoryId];

    updateBookmark(
      id,
      { ...bookmark, isPublic: !bookmark.isPublic },
      { prev, curr }
    );
  };

  return (
    <Fragment>
      {!categoryInEdit ? (
        <Message isPrimary={false}>
          Switch to grid view and click on the name of category you want to edit
        </Message>
      ) : (
        <Message isPrimary={false}>
          Editing bookmarks from&nbsp;<span>{categoryInEdit.name}</span>
          &nbsp;category
        </Message>
      )}

      {categoryInEdit && (
        <DragDropContext onDragEnd={dragEndHanlder}>
          <Droppable droppableId="bookmarks">
            {(provided) => (
              <Table
                headers={[
                  'Name',
                  'URL',
                  'Icon',
                  'Visibility',
                  'Category',
                  'Actions',
                ]}
                innerRef={provided.innerRef}
              >
                {localBookmarks.map((bookmark, index): JSX.Element => {
                  return (
                    <Draggable
                      key={bookmark.id}
                      draggableId={bookmark.id.toString()}
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
                            <td style={{ width: '200px' }}>{bookmark.name}</td>
                            <td style={{ width: '200px' }}>{bookmark.url}</td>
                            <td style={{ width: '200px' }}>{bookmark.icon}</td>
                            <td style={{ width: '200px' }}>
                              {bookmark.isPublic ? 'Visible' : 'Hidden'}
                            </td>
                            <td style={{ width: '200px' }}>
                              {categoryInEdit.name}
                            </td>

                            {!snapshot.isDragging && (
                              <TableActions
                                entity={bookmark}
                                deleteHandler={deleteBookmarkHandler}
                                updateHandler={updateBookmarkHandler}
                                changeVisibilty={changeBookmarkVisibiltyHandler}
                                showPin={false}
                              />
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
      )}
    </Fragment>
  );
};
