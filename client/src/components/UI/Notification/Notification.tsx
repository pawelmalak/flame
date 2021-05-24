import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { clearNotification } from '../../../store/actions';

import classes from './Notification.module.css';

interface ComponentProps {
  title: string;
  message: string;
  id: number;
  clearNotification: (id: number) => void;
}

const Notification = (props: ComponentProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const elementClasses = [classes.Notification, isOpen ? classes.NotificationOpen : classes.NotificationClose].join(' ');

  useEffect(() => {
    const closeNotification = setTimeout(() => {
      setIsOpen(false);
    }, 3500);

    const clearNotification = setTimeout(() => {
      props.clearNotification(props.id);
    }, 3600)

    return () => {
      window.clearTimeout(closeNotification);
      window.clearTimeout(clearNotification);
    }
  }, [])

  return (
    <div className={elementClasses}>
      <h4>{props.title}</h4>
      <p>{props.message}</p>
      <div className={classes.Pog}></div>
    </div>
  )
}

export default connect(null, { clearNotification })(Notification);