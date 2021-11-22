import { Icon } from '../UI';
import classes from './TableActions.module.css';

interface Entity {
  id: number;
  name: string;
  isPinned?: boolean;
  isPublic: boolean;
}

interface Props {
  entity: Entity;
  deleteHandler: (id: number, name: string) => void;
  updateHandler: (id: number) => void;
  pinHanlder?: (id: number) => void;
  changeVisibilty: (id: number) => void;
  showPin?: boolean;
}

export const TableActions = (props: Props): JSX.Element => {
  const {
    entity,
    deleteHandler,
    updateHandler,
    pinHanlder,
    changeVisibilty,
    showPin = true,
  } = props;

  const _pinHandler = pinHanlder || function () {};

  return (
    <td className={classes.TableActions}>
      {/* DELETE */}
      <div
        className={classes.TableAction}
        onClick={() => deleteHandler(entity.id, entity.name)}
        tabIndex={0}
      >
        <Icon icon="mdiDelete" />
      </div>

      {/* UPDATE */}
      <div
        className={classes.TableAction}
        onClick={() => updateHandler(entity.id)}
        tabIndex={0}
      >
        <Icon icon="mdiPencil" />
      </div>

      {/* PIN */}
      {showPin && (
        <div
          className={classes.TableAction}
          onClick={() => _pinHandler(entity.id)}
          tabIndex={0}
        >
          {entity.isPinned ? (
            <Icon icon="mdiPinOff" color="var(--color-accent)" />
          ) : (
            <Icon icon="mdiPin" />
          )}
        </div>
      )}

      {/* VISIBILITY */}
      <div
        className={classes.TableAction}
        onClick={() => changeVisibilty(entity.id)}
        tabIndex={0}
      >
        {entity.isPublic ? (
          <Icon icon="mdiEyeOff" color="var(--color-accent)" />
        ) : (
          <Icon icon="mdiEye" />
        )}
      </div>
    </td>
  );
};
