import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

//                                                      prepareCallback -> (Подготовка формы payload)
// export const addContact = createAction(AddContact, (name, id, number) => ({
//   payload: {
//     name,
//     id,
//     number,
//   },
// }));
// сложный вариант реализации addContact

// export const addContact = createAction('phonebook/addContact');
// console.log(addContact({ a: 5 }));
//Кидаем объект внутрь addContact вместо отдельных параметров

// export const deleteContact = createAction('phonebook/deleteContact');

export const searchContacts = createAction('phonebook/searchContacts');

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async ({ id }, thunkAPI) => {
     const state = thunkAPI.getState();
     const token = state.auth.token;
    const response = await fetch(
      `https://connections-api.herokuapp.com/contacts/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(id),
      },
    ).then(res => res.json());
    return response;
  },
);

export const fetchContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkAPI) => {
     const state = thunkAPI.getState();
     const token = state.auth.token;
    const response = await fetch(
      'https://connections-api.herokuapp.com/contacts',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      },
    ).then(res => res.json());
    return response;
  },
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
     const state = thunkAPI.getState();
     const token = state.auth.token;
    const response = await fetch(
      'https://connections-api.herokuapp.com/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({name, number}),
      },
    ).then(res => res.json());
    return response;
  },
);
