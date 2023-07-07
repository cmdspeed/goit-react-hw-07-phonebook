import { Phonebook } from './Phonebook/Phonebook';
import { PhoneBookList } from './PhoneBookList/PhoneBookList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getError, getIsLoading } from './redux/selectors';
import { getFilter, setFilter } from './redux/filterSlice';
import {
  getContactsApi,
  addContactApi,
  deleteContactApi,
} from './redux/operations';
import { useEffect } from 'react';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const filter = useSelector(getFilter);

  useEffect(() => {
    dispatch(getContactsApi());
  }, [dispatch]);

  const handleSubmit = (name, number) => {
    if (contacts.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      const contact = {
        name: name,
        number: number,
      };
      dispatch(addContactApi(contact));
    }
  };

  const handleChange = event => {
    dispatch(setFilter(event.currentTarget.value));
  };

  const fitered = () => {
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const handleDelete = id => {
    dispatch(deleteContactApi(id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Phonebook handleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      {isLoading && !error && <div>Loading...</div>}

      <PhoneBookList
        contacts={fitered()}
        number={contacts.number}
        handleDelete={handleDelete}
      />
    </div>
  );
};
