import PhoneBook from './components/PhoneBook/PhoneBook';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import UserMenu from './components/UserMenu/UserMenu';
import PublicRoute from './components/PrivatePrivateRoutes/PublicRoute';
import PrivateRoute from './components/PrivatePrivateRoutes/PrivateRoute';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser, refreshCurrentUser } from './redux/auth-actions';

import { Routes, Route } from 'react-router-dom';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Rings } from 'react-loader-spinner';

const styled = {
  display: 'flex',
  justifyContent: 'center',
  // marginTop: '100px',
  // marginBottom: '50%',
};

function App() {
  const isPageRefreshing = useSelector(state => state.auth.isPageRefreshing);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return !isPageRefreshing ? (
    <>
      <UserMenu />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/contacts"
          element={
            <PrivateRoute>
              <PhoneBook />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="/registration"
          element={
            <PublicRoute restricted>
              <Registration />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <PublicRoute restricted>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  ) : (
    <div style={styled}>
      <Rings color="#FF0000" height={80} width={80} />
    </div>
  );
}

export default App;
