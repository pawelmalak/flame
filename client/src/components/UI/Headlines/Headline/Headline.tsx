import { Fragment } from 'react';
import classes from './Headline.module.css';

interface ComponentProps {
  title: string;
  subtitle?: string | JSX.Element;
}

const Headline = (props: ComponentProps): JSX.Element => {
  return (
    <Fragment>
      <h1 className={classes.HeadlineTitle}>{props.title}</h1>
      {props.subtitle && <p className={classes.HeadlineSubtitle}>{props.subtitle}</p>}
    </Fragment>
  )
}

export default Headline;