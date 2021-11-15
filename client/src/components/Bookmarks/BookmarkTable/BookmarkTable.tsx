import { KeyboardEvent, useState, useEffect, Fragment } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../store/reducers';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';

// Typescript
import { Bookmark, Category } from '../../../interfaces';
import { ContentType } from '../Bookmarks';

// CSS
import classes from './BookmarkTable.module.css';

// UI
import { Table, Icon } from '../../UI';

interface Props {
  contentType: ContentType;
  categories: Category[];
  updateHandler: (data: Category | Bookmark) => void;
}

export const BookmarkTable = (props: Props): JSX.Element => {
  const { config } = useSelector((state: State) => state.config);

  const dispatch = useDispatch();
  const {
    pinCategory,
    deleteCategory,
    deleteBookmark,
    createNotification,
    reorderCategories,
  } = bindActionCreators(actionCreators, dispatch);

  const [localCategories, setLocalCategories] = useState<Category[]>([]);
  const [isCustomOrder, setIsCustomOrder] = useState<boolean>(false);

  // Copy categories array
  useEffect(() => {
    setLocalCategories([...props.categories]);
  }, [props.categories]);

  // Check ordering
  useEffect(() => {
    const order = config.useOrdering;

    if (order === 'orderId') {
      setIsCustomOrder(true);
    }
  });

  const deleteCategoryHandler = (category: Category): void => {
    const proceed = window.confirm(
      `Are you sure you want to delete ${category.name}? It will delete ALL assigned bookmarks`
    );

    if (proceed) {
      deleteCategory(category.id);
    }
  };

  const deleteBookmarkHandler = (bookmark: Bookmark): void => {
    const proceed = window.confirm(
      `Are you sure you want to delete ${bookmark.name}?`
    );

    if (proceed) {
      deleteBookmark(bookmark.id, bookmark.categoryId);
    }
  };

  const keyboardActionHandler = (
    e: KeyboardEvent,
    category: Category,
    handler: Function
  ) => {
    if (e.key === 'Enter') {
      handler(category);
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

    const tmpCategories = [...localCategories];
    const [movedApp] = tmpCategories.splice(result.source.index, 1);
    tmpCategories.splice(result.destination.index, 0, movedApp);

    setLocalCategories(tmpCategories);
    reorderCategories(tmpCategories);
  };

  if (props.contentType === ContentType.category) {
    return (
      <Fragment>
        <div className={classes.Message}>
          {isCustomOrder ? (
            <p>You can drag and drop single rows to reorder categories</p>
          ) : (
            <p>
              Custom order is disabled. You can change it in{' '}
              <Link to="/settings/other">settings</Link>
            </p>
          )}
        </div>
        <DragDropContext onDragEnd={dragEndHanlder}>
          <Droppable droppableId="categories">
            {(provided) => (
              <Table
                headers={['Name', 'Visibility', 'Actions']}
                innerRef={provided.innerRef}
              >
                {localCategories.map(
                  (category: Category, index): JSX.Element => {
                    return (
                      <Draggable
                        key={category.id}
                        draggableId={category.id.toString()}
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
                              <td style={{ width: '300px' }}>
                                {category.name}
                              </td>
                              <td style={{ width: '300px' }}>
                                {category.isPublic ? 'Visible' : 'Hidden'}
                              </td>
                              {!snapshot.isDragging && (
                                <td className={classes.TableActions}>
                                  <div
                                    className={classes.TableAction}
                                    onClick={() =>
                                      deleteCategoryHandler(category)
                                    }
                                    onKeyDown={(e) =>
                                      keyboardActionHandler(
                                        e,
                                        category,
                                        deleteCategoryHandler
                                      )
                                    }
                                    tabIndex={0}
                                  >
                                    <Icon icon="mdiDelete" />
                                  </div>
                                  <div
                                    className={classes.TableAction}
                                    onClick={() =>
                                      props.updateHandler(category)
                                    }
                                    tabIndex={0}
                                  >
                                    <Icon icon="mdiPencil" />
                                  </div>
                                  <div
                                    className={classes.TableAction}
                                    onClick={() => pinCategory(category)}
                                    onKeyDown={(e) =>
                                      keyboardActionHandler(
                                        e,
                                        category,
                                        pinCategory
                                      )
                                    }
                                    tabIndex={0}
                                  >
                                    {category.isPinned ? (
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
                  }
                )}
              </Table>
            )}
          </Droppable>
        </DragDropContext>
      </Fragment>
    );
  } else {
    const bookmarks: { bookmark: Bookmark; categoryName: string }[] = [];
    props.categories.forEach((category: Category) => {
      category.bookmarks.forEach((bookmark: Bookmark) => {
        bookmarks.push({
          bookmark,
          categoryName: category.name,
        });
      });
    });

    return (
      <Table
        headers={['Name', 'URL', 'Icon', 'Visibility', 'Category', 'Actions']}
      >
        {bookmarks.map(
          (bookmark: { bookmark: Bookmark; categoryName: string }) => {
            return (
              <tr key={bookmark.bookmark.id}>
                <td>{bookmark.bookmark.name}</td>
                <td>{bookmark.bookmark.url}</td>
                <td>{bookmark.bookmark.icon}</td>
                <td>{bookmark.bookmark.isPublic ? 'Visible' : 'Hidden'}</td>
                <td>{bookmark.categoryName}</td>
                <td className={classes.TableActions}>
                  <div
                    className={classes.TableAction}
                    onClick={() => deleteBookmarkHandler(bookmark.bookmark)}
                    tabIndex={0}
                  >
                    <Icon icon="mdiDelete" />
                  </div>
                  <div
                    className={classes.TableAction}
                    onClick={() => props.updateHandler(bookmark.bookmark)}
                    tabIndex={0}
                  >
                    <Icon icon="mdiPencil" />
                  </div>
                </td>
              </tr>
            );
          }
        )}
      </Table>
    );
  }
};
