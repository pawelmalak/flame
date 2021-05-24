import { connect } from 'react-redux';
import { GlobalState, Notification as _Notification } from '../../interfaces';

import classes from './NotificationCenter.module.css';

import Notification from '../UI/Notification/Notification';

interface ComponentProps {
  notifications: _Notification[];
}

const NotificationCenter = (props: ComponentProps): JSX.Element => {
  return (
    <div
      className={classes.NotificationCenter}
      style={{ height: `${props.notifications.length * 75}px` }}
    >
      {props.notifications.map((notification: _Notification) => {
        return (
          <Notification
            title={notification.title}
            message={notification.message}
            id={notification.id}
            key={notification.id}
          />
        )
      })}
    </div>
  )
}

const mapStateToProps = (state: GlobalState) => {
  return {
    notifications: state.notification.notifications
  }
}

export default connect(mapStateToProps)(NotificationCenter);