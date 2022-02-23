import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import UserMenu from './components/UserMenu/UserMenu';
import PrivateRoute from './components/PrivatePrivateRoutes/PrivateRoute';
import PublicRoute from './components/PrivatePrivateRoutes/PublicRoute';

import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

console.log('log: ', store.getState().auth.isLoggedIn);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <UserMenu />
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* <Route exact path="/contacts" element={<App />} /> */}
            <Route
              exact
              path="/contacts"
              element={
                <PrivateRoute>
                  <App />
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
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
