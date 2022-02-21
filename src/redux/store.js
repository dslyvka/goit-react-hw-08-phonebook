// ReduxPersist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
// ReduxPersist

// ReduxToolkit
import {
  configureStore,
  getDefaultMiddleware,
  createReducer,
  combineReducers,
} from '@reduxjs/toolkit';
// ReduxToolkit

import * as actions from './phonebook-actions';
import logger from 'redux-logger';
import { register, login, logOut } from './auth-actions';

const middleware =
  process.env.NODE_ENV === 'development'
    ? [
        ...getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
        logger,
      ]
    : [
        ...getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
      ];

// const itemsReducer = (state = [], { type, payload }) => {
//   switch (type) {
//     case AddContact:
//       return [...state, { ...payload }];
//     case DeleteContact:
//       return [...state.filter(contact => contact.id !== payload)];

//     default:
//       return state;
//   }
// };
const initialState = {
  user: { name: null, email: null },
  token: '',
  isLoggedIn: false,
};

const authReducer = createReducer(initialState, {
  [register.fulfilled]: (state, { payload }) => ({
    ...state,
    isLoggedIn: true,
    token: payload.token,
    user: payload.user,
  }),
  [register.rejected]: (_, { payload }) => {
    console.log(payload);
  },
  [login.fulfilled]: (state, { payload }) => ({
    ...state,
    isLoggedIn: true,
    token: payload.token,
    user: payload.user,
  }),
  [logOut.fulfilled]: (state, _) => ({
    ...state,
    user: { name: null, email: null },
    token: '',
    isLoggedIn: false,
  }),
  [logOut.rejected]: (_, { payload }) => {
    console.log(payload);
  },
});

const items = createReducer([], {
  [actions.fetchContacts.fulfilled]: (_, { payload }) => payload,
  //                     Деструктуризируем payload из action
  [actions.addContact.fulfilled]: (state, { payload }) => [...state, payload],
  [actions.deleteContact.fulfilled]: (state, { payload }) => [
    ...state.filter(contact => contact.id !== payload.id),
  ],
});

// const filterReducer = (state = '', { type, payload }) => {
//   switch (type) {
//     case SearchContacts:
//       return payload;

//     default:
//       return state;
//   }
// };

const filter = createReducer('', {
  [actions.searchContacts]: (_, { payload }) => payload,
});

const contactsReducer = combineReducers({
  items,
  filter,
});

// const contactsPersistConfig = {
//   key: 'contacts',
//   storage,
//   blacklist: ['filter'],
// };

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware,
});

const persistor = persistStore(store);

export { store, persistor };
