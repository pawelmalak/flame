const classes = require('./SettingsHeadline.module.css');

interface Props {
  text: string;
}

const SettingsHeadline = (props: Props): JSX.Element => {
  return <h2 className={classes.SettingsHeadline}>{props.text}</h2>;
};

export default SettingsHeadline;
