import { Link } from 'react-router-dom';

import classes from './SectionHeadline.module.css';

interface ComponentProps {
  title: string;
  link: string
}

const SectionHeadline = (props: ComponentProps): JSX.Element => {
  return (
    <Link to={props.link}>
      <h2 className={classes.SectionHeadline}>{props.title}</h2>
    </Link>
  )
}

export default SectionHeadline;