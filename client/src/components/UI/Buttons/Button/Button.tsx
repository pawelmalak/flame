import classes from './Button.module.css';

interface ComponentProps {
  children: string;
  click?: any;
}

const Button = (props: ComponentProps): JSX.Element => {
  const {
    children,
    click
  } = props;

  return (
    <button className={classes.Button} onClick={click ? click : () => {}} >
      {children}
    </button>
  )
}

export default Button;