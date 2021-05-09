import { Fragment } from 'react';

import classes from './Apps.module.css';

import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headlines/Headline/Headline';
import AppCard from './AppCard/AppCard';

const Apps = (): JSX.Element => {
  return (
    <div className={classes.Apps}>
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
    </div>
  )
}

export default Apps;