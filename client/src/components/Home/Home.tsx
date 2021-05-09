import { Link } from 'react-router-dom';
import Icon from '../UI/Icon/Icon';

import classes from './Home.module.css';
import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headlines/Headline/Headline';
import SectionHeadline from '../UI/Headlines/SectionHeadline/SectionHeadline';
import Apps from '../Apps/Apps';

const Home = (): JSX.Element => {
  const dateAndTime = (): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const now = new Date();

    return `${days[now.getDay()]}, ${now.getDate()} of ${months[now.getMonth()]} ${now.getFullYear()}`;
  }

  const greeter = (): string => {
    const now = new Date().getHours();
    let msg: string;

    if (now > 18) {
      msg = 'Good evening!';
    } else if (now > 12) {
      msg = 'Good afternoon!';
    } else if (now > 6) {
      msg = 'Good morning!';
    } else if (now > 0) {
      msg = 'Good night!';
    } else {
      msg = 'Hello!';
    }

    return msg;
  }

  (() => {
    const mdiName = 'book-open-blank-variant';
    const expected = 'mdiBookOpenBlankVariant';

    let parsedName = mdiName
      .split('-')
      .map((word: string) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join('');
    parsedName = `mdi${parsedName}`;
    
    console.log(parsedName);
    console.log(parsedName === expected);
  })();

  return (
    <Container>
      <header className={classes.Header}>
        <p>{dateAndTime()}</p>
        <h1>{greeter()}</h1>
      </header>

      <SectionHeadline title='Apps' />
      <Apps />

      <SectionHeadline title='Bookmarks' />

      <Link to='/settings' className={classes.SettingsButton}>
        <Icon icon='mdiCog' />
      </Link>
    </Container>
  )
}

export default Home;