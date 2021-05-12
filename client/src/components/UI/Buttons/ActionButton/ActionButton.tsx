import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import classes from './ActionButton.module.css';
import Icon from '../../Icon/Icon';

interface ComponentProps {
  name: string;
  icon: string;
  link?: string;
  handler?: () => void;
}

const ActionButton = (props: ComponentProps): JSX.Element => {
  const body = (
    <Fragment>
      <div className={classes.ActionButtonIcon}>
        <Icon icon={props.icon} />
      </div>
      <div className={classes.ActionButtonName}>
        {props.name}
      </div>
    </Fragment>
  );

  if (props.link) {
    return (<Link to={props.link}>{body}</Link>)
  } else if (props.handler) {
    return (<div className={classes.ActionButton} onClick={props.handler}>{body}</div>)
  } else {
    return (<div className={classes.ActionButton}>{body}</div>)
  }
}

export default ActionButton;