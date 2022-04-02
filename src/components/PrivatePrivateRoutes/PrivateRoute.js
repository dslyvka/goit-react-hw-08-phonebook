import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children, restricted = false }) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  // console.log('Private isLoggedIn: ', isLoggedIn);
  // console.log('Private redirect: ', shouldRedirect);
  return shouldRedirect ? children : <Navigate to="/login" />;
}
