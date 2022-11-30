import { useAtomValue } from 'jotai';
import { Redirect, Route, RouteProps } from 'react-router';
import { authAtom } from '../../state/auth';

export const ProtectedRoute = ({ ...rest }: RouteProps) => {
  const { isAuthenticated } = useAtomValue(authAtom);

  if (isAuthenticated) {
    return <Route {...rest} />;
  } else {
    return <Redirect to="/settings/app" />;
  }
};
