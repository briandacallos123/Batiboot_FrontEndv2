import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_BATIBOOT, PATH_BATIBOOT_USER, PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, user } = useAuth();
  console.log(user);

  if (isAuthenticated && user.user_role ==='admin') {
    return <Navigate to={PATH_BATIBOOT.root} />;
  } if (isAuthenticated && user.user_role ==='user') {
    return <Navigate to={PATH_BATIBOOT_USER.root} />;
  }

  return <>{children}</>;
}
