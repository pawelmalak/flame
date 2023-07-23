import classes from './SettingsHeadline.module.css';

interface Props {
  text: string;
}

export const SettingsHeadline = (props: Props): JSX.Element => {
  return <h2 className={classes.SettingsHeadline}>{props.text}</h2>;
};
