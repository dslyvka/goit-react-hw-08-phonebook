import { Fragment } from 'react';
import { StyledList } from './Contacts.styled';
import { useDispatch } from 'react-redux';

function Contacts({ contacts, deleteContact }) {
  const dispatch = useDispatch();
  return (
    <Fragment>
      <StyledList>
        {contacts.map(contact => {
          const { id, name, phone } = contact;
          return (
            <li key={id}>
              <p>
                {name}: {phone}
                <button
                  id={id}
                  onClick={() => {
                    dispatch(deleteContact(id));
                  }}
                >
                  delete
                </button>
              </p>
            </li>
          );
        })}
      </StyledList>
    </Fragment>
  );
}

export default Contacts;
