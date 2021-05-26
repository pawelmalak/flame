import classes from './Button.module.css';

interface ComponentProps {
  children: string;
}

const Button = (props: ComponentProps): JSX.Element => {
  return <button className={classes.Button}>{props.children}</button>
}

export default Button;