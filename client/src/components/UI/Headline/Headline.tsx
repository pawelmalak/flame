import { Fragment } from 'react';
import classes from './Headline.module.css';

interface ComponentProps {
  title: string;
  subtitle?: string;
}

const Headline = (props: ComponentProps): JSX.Element => {
  return (
    <Fragment>
      <h2 className={classes.HeadlineTitle}>{props.title}</h2>
      {props.subtitle && <p className={classes.HeadlineSubtitle}>{props.subtitle}</p>}
    </Fragment>
  )
}

export default Headline;