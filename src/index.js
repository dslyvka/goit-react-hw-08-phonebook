import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import UserMenu from './components/UserMenu/UserMenu';

import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <UserMenu />
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

