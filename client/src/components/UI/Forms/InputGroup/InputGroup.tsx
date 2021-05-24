import classes from './InputGroup.module.css';

interface ComponentProps {
  children: JSX.Element | JSX.Element[];
}

const InputGroup = (props: ComponentProps): JSX.Element => {
  return (
    <div className={classes.InputGroup}>
      {props.children}
    </div>
  )
}

export default InputGroup;