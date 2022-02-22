import { Fragment } from 'react';

import Filter from './components/Filter/Filter';
import Form from './components/Form/Form';
import Contacts from './components/Contacts/Contacts';
import { SectionStyled } from './components/Contacts/SectionContacts.styled';

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchContacts } from './redux/phonebook-actions';
import { fetchCurrentUser } from './redux/auth-actions';

import {
  addContact,
  deleteContact,
  searchContacts,
} from './redux/phonebook-actions';

function App() {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts.items);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) dispatch(fetchContacts());
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  const [number, setPhone] = useState('');
  const [name, setName] = useState('');

  const { filter } = useSelector(state => {
    // console.log(state);
    return state.contacts;
  });
  // console.log('contacts', contacts);

  // const contacts1 = dispatch(fetchContacts());
  // console.log('data: ', contacts1);

  const onInput = e => {
    const form = e.currentTarget.name;
    switch (form) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setPhone(e.currentTarget.value);
        break;
      default:
        return;
    }
  };

  const onClick = e => {
    e.preventDefault();

    if (e.target.checkValidity()) {
      if (
        contacts.find(
          contact =>
            contact.name.toLowerCase().includes(name.toLowerCase()) &&
            contact.name.toLowerCase().length === name.length,
        )
      ) {
        alert(`${name} is already in contacts`);
        return;
      }
      dispatch(addContact({ name, number }));
      // dispatch(fetchContacts());
      // Пропихиваем объект, котоорый в редьюсере будет в виде payload
    }
  };

  const filterContacts = () => {
    const contactNormalized = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(contactNormalized),
    );
    return filteredContacts;
  };

  const filteredContacts = filterContacts();

  return isLoggedIn ? (
    <Fragment>
      <Form onInput={onInput} onClick={onClick}></Form>
      <SectionStyled>
        <Filter value={filter} search={searchContacts}></Filter>
        <Contacts
          contacts={filteredContacts}
          deleteContact={deleteContact}
        ></Contacts>
      </SectionStyled>
    </Fragment>
  ) : (
    <></>
  );
}

export default App;
