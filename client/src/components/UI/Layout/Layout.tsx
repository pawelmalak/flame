import classes from './Layout.module.css';

interface ComponentProps {
  children: JSX.Element | JSX.Element[];
}

export const Container = (props: ComponentProps): JSX.Element => {
  return (
    <div className={classes.Container}>
      {props.children}
    </div>
  )
}