import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, role }) => {
  const { user, token } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (role === 'admin' && user?.role !== 'admin') {
    return <Navigate to='/' replace />;
  }

  if (role === 'user' && user?.role !== 'user') {
    return <Navigate to='/admin/dashboard' replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string,
};

export default PrivateRoute;
