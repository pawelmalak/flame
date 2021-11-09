import classes from './Button.module.css';

interface Props {
  children: string;
  click?: any;
}

export const Button = (props: Props): JSX.Element => {
  const { children, click } = props;

  return (
    <button className={classes.Button} onClick={click ? click : () => {}}>
      {children}
    </button>
  );
};
