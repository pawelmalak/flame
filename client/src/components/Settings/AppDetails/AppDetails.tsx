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
      <p className={classes.AppVersion}>
        See changelog {' '}
        <a
          href='https://github.com/pawelmalak/flame/blob/master/CHANGELOG.md'
          target='_blank'
          rel='noreferrer'>
          here
        </a>
      </p>
      <Button click={() => checkVersion(true)}>Check for updates</Button>
    </Fragment>
  )
}

export default AppDetails;
