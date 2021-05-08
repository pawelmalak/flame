import { Link } from 'react-router-dom';
import Icon from '../UI/Icon/Icon';

import classes from './Home.module.css';
import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headline/Headline';

const Home = (): JSX.Element => {
  const dateAndTime = (): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const date = new Date();


    return `${days[date.getDay()]}, ${date.getDate()} of ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  return (
    <Container>
      <Headline title='Home' subtitle={dateAndTime()} />
      <Link to='/settings' className={classes.SettingsButton}>
        <Icon icon='mdiCog' />
      </Link>
    </Container>
  )
}

export default Home;