import { Link } from 'react-router-dom';
import classes from './SectionHeadline.module.css';

interface Props {
  title: string;
  link: string;
}

export const SectionHeadline = (props: Props): JSX.Element => {
  return (
    <Link to={props.link} className={classes.SectionHeadlineLink}>
      <h2 className={classes.SectionHeadline}>{props.title}</h2>
    </Link>
  );
};
