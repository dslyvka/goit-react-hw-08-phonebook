import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
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

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
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

export const fetchCurrentUser = createAsyncThunk(
  'auth/currentUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    // console.log(token);
    if (!token) return thunkAPI.rejectWithValue();
    const response = await fetch(
      'https://connections-api.herokuapp.com/users/current',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      },
    ).then(res => res.json());
    console.log(response);
    return response;
  },
);

