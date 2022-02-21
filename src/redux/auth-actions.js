import { createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const register = createAsyncThunk('auth/signup', async contact => {
  const response = await fetch(
    'https://connections-api.herokuapp.com/users/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(contact),
    },
  ).then(res => res.json());
  console.log(response);
  return response;
});

export const login = createAsyncThunk('auth/login', async contact => {
  const response = await fetch(
    'https://connections-api.herokuapp.com/users/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(contact),
    },
  ).then(res => res.json());
  console.log(response);
  return response;
});

export const logOut = createAsyncThunk('auth/logOut', async token => {
  const response = await fetch(
    'https://connections-api.herokuapp.com/users/logout',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    },
  ).then(res => res.json());
  console.log(response);
  return response;
});
