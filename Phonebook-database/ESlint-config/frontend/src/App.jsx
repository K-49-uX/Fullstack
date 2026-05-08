import { useState, useEffect } from 'react';
import personService from './services/persons';
import Notification from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data));
  }, []);

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const addPerson = (e) => {
    e.preventDefault();

    const existingPerson = persons.find(p => p.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added. Replace the old number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id !== existingPerson.id ? p : returnedPerson
            ));
            setNewName('');
            setNewNumber('');
            showMessage(`Updated ${returnedPerson.name}`);
          })
          .catch(error => {
            if (error.response?.status === 404) {
              showMessage(
                `Information of ${existingPerson.name} has already been removed from server`,
                'error'
              );
              setPersons(persons.filter(p => p.id !== existingPerson.id));
            } else {
              const backendMessage = error.response?.data?.error;
              showMessage(backendMessage || 'Failed to update person', 'error');
            }
          });
      }
      return;
    }

    const personObject = { name: newName, number: newNumber };

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        showMessage(`Added ${returnedPerson.name}`);
      })
      .catch(error => {
        const backendMessage = error.response?.data?.error;
        showMessage(backendMessage || 'Failed to add person', 'error');
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .delete(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          showMessage(`Deleted ${name}`);
        })
        .catch(() => {
          showMessage(
            `Information of ${name} has already been removed from server`,
            'error'
          );
          setPersons(persons.filter(p => p.id !== id));
        });
    }
  };

  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} type={messageType} />

      <Filter filter={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;