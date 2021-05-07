import classes from './Layout.module.css';

export const Container = (props: any): JSX.Element => {
  return (
    <div className={classes.Container}>
      {props.children}
    </div>
  )
}