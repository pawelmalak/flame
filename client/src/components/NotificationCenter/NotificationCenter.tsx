import { useAtomValue } from 'jotai';
import { Notification as NotificationInterface } from '../../interfaces';
import { notificationsAtom } from '../../state/notification';
import { Notification } from '../UI';
import classes from './NotificationCenter.module.css';

export const NotificationCenter = (): JSX.Element => {
  const { notifications } = useAtomValue(notificationsAtom);

  return (
    <div
      className={classes.NotificationCenter}
      style={{ height: `${notifications.length * 75}px` }}
    >
      {notifications.map((notification: NotificationInterface) => {
        return (
          <Notification
            title={notification.title}
            message={notification.message}
            url={notification.url || null}
            id={notification.id}
            key={notification.id}
          />
        );
      })}
    </div>
  );
};
