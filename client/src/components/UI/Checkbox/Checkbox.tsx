import C from 'classnames';
import classes from './Checkbox.module.css';

interface Props {
  checked: boolean;
  onClick(): void;
  id?: string;
  name?: string;
}

export const Checkbox = ({
  id,
  name,
  checked,
  onClick,
}: Props): JSX.Element => {
  return (
    <div
      className={C(classes.Checkbox, { [classes.Checked]: checked })}
      onClick={onClick}
    >
      <input type="checkbox" {...{ id, name }} />
    </div>
  );
};
