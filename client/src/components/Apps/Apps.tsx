import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { getApps } from '../../store/actions';

// Typescript
import { App } from '../../interfaces';

// CSS
import classes from './Apps.module.css';

// UI
import { Container } from '../UI/Layout/Layout';
import Headline from '../UI/Headlines/Headline/Headline';
import Spinner from '../UI/Spinner/Spinner';

// Subcomponents
import AppCard from './AppCard/AppCard';

interface ComponentProps {
  getApps: Function;
  apps: App[];
  loading: boolean;
}

const Apps = (props: ComponentProps): JSX.Element => {
  useEffect(() => {
    props.getApps()
  }, [props.getApps]);

  return (
    <Container>
      <Headline
        title='Pinned Apps'
        subtitle={<Link to='/'>Go back</Link>}
      />
      <Headline title='All Apps' />
      <div className={classes.Apps}>
        {props.loading
          ? 'loading'
          : props.apps.map((app: App): JSX.Element => {
            return <AppCard key={app.id} app={app} />
          })
        }
      </div>
    </Container>
  )
}

const mapStateToProps = (state: any) => {
  return {
    apps: state.app.apps,
    loading: state.app.loading
  }
}

export default connect(mapStateToProps, { getApps })(Apps);