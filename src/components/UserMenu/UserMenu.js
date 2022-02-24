import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logOut } from '../../redux/auth-actions';


export default function UserMenu() {
  const user = useSelector(state => state.auth.user);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  let navigate = useNavigate();


  const dispatch = useDispatch();

  const handleLogOutClick = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <>
      <nav>
        {!isLoggedIn && (
          <ul>
            <li>
              <NavLink to="/">home</NavLink>
            </li>
            <li>
              <NavLink to="/contacts">contacts</NavLink>
            </li>
            <li>
              <NavLink to="/login">login</NavLink>
            </li>
            <li>
              <NavLink to="/registration">sign up</NavLink>
            </li>
          </ul>
        )}
      </nav>
      {isLoggedIn && (
        <ul>
          {' '}
          <li>
            <NavLink to="/">home</NavLink>
          </li>
          <li>
            <NavLink to="/contacts">contacts</NavLink>
          </li>
        </ul>
      )}
      {isLoggedIn && <span>Добро пожаловать, {user.name}</span>}
      {isLoggedIn && (
        <button type="button" onClick={handleLogOutClick}>
          logout
        </button>
      )}
      <hr />
    </>
  );
}
