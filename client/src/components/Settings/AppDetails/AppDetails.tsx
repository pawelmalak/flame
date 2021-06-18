import { Fragment } from 'react';

import classes from './AppDetails.module.css';
import Button from '../../UI/Buttons/Button/Button';
import { checkVersion } from '../../../utility';

const AppDetails = (): JSX.Element => {
  return (
    <Fragment>
      <p className={classes.AppVersion}>
        <a
          href='https://github.com/pawelmalak/flame'
          target='_blank'
          rel='noreferrer'>
          Flame
        </a>
        {' '}
        version {process.env.REACT_APP_VERSION}
      </p>
      <Button click={() => checkVersion(true)}>Check for updates</Button>
    </Fragment>
  )
}

export default AppDetails;