import { Link } from 'react-router-dom';

import classes from './Apps.module.css';

import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headline/Headline';

const Apps = (): JSX.Element => {
  return (
    <Container>
      <Headline title='Welcome' />
      <Link to='/settings'>settings</Link>
    </Container>
  )
}

export default Apps;