import { ContentType } from '../Bookmarks';
import classes from './BookmarkTable.module.css';

import Table from '../../UI/Table/Table';
import { Bookmark, Category } from '../../../interfaces';
import Icon from '../../UI/Icons/Icon/Icon';

interface ComponentProps {
  contentType: ContentType;
  categories: Category[];
}

const BookmarkTable = (props: ComponentProps): JSX.Element => {
  if (props.contentType === ContentType.category) {
    return (
      <Table headers={[
        'Name',
        'Actions'
      ]}>
        {props.categories.map((category: Category) => {
          return (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td className={classes.TableActions}>
                <div
                  className={classes.TableAction}
                  // onClick={() => deleteAppHandler(app)}
                  // onKeyDown={(e) => keyboardActionHandler(e, app, deleteAppHandler)}
                  tabIndex={0}>
                  <Icon icon='mdiDelete' />
                </div>
                <div
                  className={classes.TableAction}
                  // onClick={() => props.updateAppHandler(app)}
                  // onKeyDown={(e) => keyboardActionHandler(e, app, props.updateAppHandler)}
                  tabIndex={0}>
                  <Icon icon='mdiPencil' />
                </div>
                <div
                  className={classes.TableAction}
                  // onClick={() => props.pinApp(app)}
                  // onKeyDown={(e) => keyboardActionHandler(e, app, props.pinApp)}
                  tabIndex={0}>
                  {category.isPinned
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
  } else {
    const bookmarks: {bookmark: Bookmark, categoryName: string}[] = [];
    props.categories.forEach((category: Category) => {
      category.bookmarks.forEach((bookmark: Bookmark) => {
        bookmarks.push({
          bookmark,
          categoryName: category.name
        });
      })
    })

    return (
      <Table headers={[
        'Name',
        'URL',
        'Category',
        'Actions'
      ]}>
        {bookmarks.map((bookmark: {bookmark: Bookmark, categoryName: string}) => {
          return (
            <tr key={bookmark.bookmark.id}>
              <td>{bookmark.bookmark.name}</td>
              <td>{bookmark.bookmark.url}</td>
              <td>{bookmark.categoryName}</td>
              <td className={classes.TableActions}>
                <div
                  className={classes.TableAction}
                  // onClick={() => deleteAppHandler(app)}
                  // onKeyDown={(e) => keyboardActionHandler(e, app, deleteAppHandler)}
                  tabIndex={0}>
                  <Icon icon='mdiDelete' />
                </div>
                <div
                  className={classes.TableAction}
                  // onClick={() => props.updateAppHandler(app)}
                  // onKeyDown={(e) => keyboardActionHandler(e, app, props.updateAppHandler)}
                  tabIndex={0}>
                  <Icon icon='mdiPencil' />
                </div>
              </td>
            </tr>
          )
        })}
      </Table>
    )
  }
}

export default BookmarkTable;