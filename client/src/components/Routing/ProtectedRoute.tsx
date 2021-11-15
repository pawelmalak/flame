import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { State } from '../../store/reducers';

export const ProtectedRoute = ({ ...rest }: RouteProps) => {
  const { isAuthenticated } = useSelector((state: State) => state.auth);

  if (isAuthenticated) {
    return <Route {...rest} />;
  } else {
    return <Redirect to="/settings/app" />;
  }
};
