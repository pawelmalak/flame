import classes from './Spinner.module.css';

const Spinner = (): JSX.Element => {
  return (
    <div className={classes.SpinnerWrapper}>
      <div className={classes.Spinner}>Loading...</div>
    </div>
  )
}

export default Spinner;