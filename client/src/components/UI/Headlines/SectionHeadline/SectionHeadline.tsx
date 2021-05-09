import classes from './SectionHeadline.module.css';

interface ComponentProps {
  title: string;
}

const SectionHeadline = (props: ComponentProps): JSX.Element => {
  return (
    <h2 className={classes.SectionHeadline}>{props.title}</h2>
  )
}

export default SectionHeadline;