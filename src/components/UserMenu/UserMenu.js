import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logOut } from '../../redux/auth-actions';

import { Link, Button, Typography } from '@mui/material';
import { List, ListItem } from '@mui/material';
import { Box } from '@mui/material';

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
              <NavLink to="/" className={({ isActive }) => isActive? "active link": ''} >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts" className={({ isActive }) => isActive? "active link": ''} >Contacts</NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive }) => isActive? "active link": ''} >Login</NavLink>
            </li>
            <li>
              <NavLink to="/registration" className={({ isActive }) => isActive? "active link": ''} >SignUp</NavLink>
            </li>
          </ul>
        )}
      </nav>
      {isLoggedIn && (
        <ul>
          {' '}
          <li>
            <NavLink to="/" className={({ isActive }) => isActive? "active link": ''} >Home</NavLink>
          </li>
          <li>
            <NavLink to="/contacts" className={({ isActive }) => isActive? "active link": ''} >Contacts</NavLink>
          </li>
          {isLoggedIn && <span>Добро пожаловать, {user.name}</span>}
          {isLoggedIn && (
            <button onClick={handleLogOutClick}>
              logout
            </button>
          )}
        </ul>
      )}
      <hr />
    </>
  );
}
