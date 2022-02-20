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
  async id => {
    const response = await fetch(
      `https://620677d592dd6600171c0afc.mockapi.io/contacts/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        // body: JSON.stringify(id),
      },
    ).then(res => res.json());
    return response;
  },
);

export const fetchContacts = createAsyncThunk(
  'contacts/getContacts',
  async () => {
    const response = await fetch(
      'https://620677d592dd6600171c0afc.mockapi.io/contacts',
    ).then(res => res.json());
    return response;
  },
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    const response = await fetch(
      'https://620677d592dd6600171c0afc.mockapi.io/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(contact),
      },
    ).then(res => res.json());
    return response;
  },
);
