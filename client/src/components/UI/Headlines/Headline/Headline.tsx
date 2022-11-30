import { Fragment, ReactNode } from 'react';
import classes from './Headline.module.css';

interface Props {
  title: string;
  subtitle?: ReactNode;
}

export const Headline = (props: Props): JSX.Element => {
  return (
    <>
      <h1 className={classes.HeadlineTitle}>{props.title}</h1>
      {props.subtitle && (
        <p className={classes.HeadlineSubtitle}>{props.subtitle}</p>
      )}
    </>
  );
};
