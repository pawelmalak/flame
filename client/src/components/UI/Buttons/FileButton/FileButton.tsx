import { ChangeEvent, Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';

import classes from './FileButton.module.css';
import { Icon } from '../..';

interface Props {
  name: string;
  icon: string;
  link?: string;
  handler?: (file: File) => void;
}

export const FileButton = (props: Props): JSX.Element => {
  const imageRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;

    if (target?.files && target?.files[0]) {
      if(props.handler) props.handler(target?.files[0]);
    }
  };

  const open = () => {
    imageRef?.current?.click();
  };

  const body = (
    <Fragment>
      <div className={classes.ActionButtonIcon}>
        <Icon icon={props.icon} />
      </div>
      <div className={classes.ActionButtonName}>{props.name}</div>
    </Fragment>
  );

  if (props.link) {
    return (
      <Link to={props.link} tabIndex={0}>
        {body}
      </Link>
    );
  } else if (props.handler) {
    return (
      <div
        className={classes.ActionButton}
        onClick={open}
        tabIndex={0}
      >
        <input
          ref={imageRef}
          type="file"
          style={{ display: 'none' }}
          accept=".html"
          onChange={handleChange}
        />
        {body}
      </div>
    );
  } else {
    return <div className={classes.ActionButton}>{body}</div>;
  }
};
