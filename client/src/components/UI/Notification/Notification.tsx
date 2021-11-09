import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';

import classes from './Notification.module.css';

interface Props {
  title: string;
  message: string;
  id: number;
  url: string | null;
}

export const Notification = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { clearNotification } = bindActionCreators(actionCreators, dispatch);

  const [isOpen, setIsOpen] = useState(true);
  const elementClasses = [
    classes.Notification,
    isOpen ? classes.NotificationOpen : classes.NotificationClose,
  ].join(' ');

  useEffect(() => {
    const closeNotification = setTimeout(() => {
      setIsOpen(false);
    }, 3500);

    const clearNotificationTimeout = setTimeout(() => {
      clearNotification(props.id);
    }, 3600);

    return () => {
      window.clearTimeout(closeNotification);
      window.clearTimeout(clearNotificationTimeout);
    };
  }, []);

  const clickHandler = () => {
    if (props.url) {
      window.open(props.url, '_blank');
    }
  };

  return (
    <div className={elementClasses} onClick={clickHandler}>
      <h4>{props.title}</h4>
      <p>{props.message}</p>
      <div className={classes.Pog}></div>
    </div>
  );
};
