import { useSelector } from 'react-redux';
import { Notification as NotificationInterface } from '../../interfaces';

import classes from './NotificationCenter.module.css';

import { Notification } from '../UI';
import { State } from '../../store/reducers';

export const NotificationCenter = (): JSX.Element => {
  const { notifications } = useSelector((state: State) => state.notification);

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
