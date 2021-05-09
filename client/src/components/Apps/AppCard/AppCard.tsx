import classes from './AppCard.module.css';
import Icon from '../../UI/Icon/Icon';

const AppCard = (): JSX.Element => {
  return (
    <div className={classes.AppCard}>
      <div className={classes.AppCardIcon}>
        <Icon icon='mdiBookOpenBlankVariant' />
      </div>
      <div className={classes.AppCardDetails}>
        <h5>plex</h5>
        <a href="/">plex.example.com</a>
      </div>
    </div>
  )
}

export default AppCard;