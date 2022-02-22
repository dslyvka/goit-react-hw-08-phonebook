import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logOut } from '../../redux/auth-actions';

export default function UserMenu() {
  const user = useSelector(state => state.auth.user);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      return navigate('/');
    }
  }, [isLoggedIn]);

  const dispatch = useDispatch();

  const handleLogOutClick = () => {
    dispatch(logOut());
  };

  return (
    <>
      <nav>
        {!isLoggedIn && (
          <ul>
            <li>
              <NavLink to="/login">login</NavLink>
            </li>
            <li>
              <NavLink to="/registration">sign up</NavLink>
            </li>
          </ul>
        )}
      </nav>
      {isLoggedIn && <span>Добро пожаловать, {user.name}</span>}
      {isLoggedIn && <button type="button" onClick={handleLogOutClick}>logout</button>}
      <hr />
    </>
  );
}
