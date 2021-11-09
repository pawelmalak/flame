import classes from './Spinner.module.css';

export const Spinner = (): JSX.Element => {
  return (
    <div className={classes.SpinnerWrapper}>
      <div className={classes.Spinner}>Loading...</div>
    </div>
  );
};
