import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Filter from '../Filter/Filter';
import Contacts from '../Contacts/Contacts';
import Form from '../Form/Form';
import { SectionStyled } from '../Contacts/SectionContacts.styled';

import { fetchCurrentUser } from '../../redux/auth-actions';

import {
  fetchContacts,
  addContact,
  deleteContact,
  searchContacts,
} from '../../redux/phonebook-actions';

export default function PhoneBook() {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts.items);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) dispatch(fetchContacts());
  }, [isLoggedIn]);


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

  return (
    <>
      <Form onInput={onInput} onClick={onClick}></Form>
      <SectionStyled>
        <Filter value={filter} search={searchContacts}></Filter>
        <Contacts
          contacts={filteredContacts}
          deleteContact={deleteContact}
        ></Contacts>
      </SectionStyled>
    </>
  );
}
