import { useEffect, useState } from "react";
import personService from "./services/";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/Personlist";
import SearchFeature from "./components/SearchFeature";
import Notification from "./components/Notification";
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [message, setMessaage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPeople => setPersons(initialPeople));
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search, persons]);

  const handleChange = (e) => {
    if (e.target.name === "newName") {
      setNewName(e.target.value);
    } else if (e.target.name === "number") {
      setNumber(e.target.value);
    } else {
      setSearch(e.target.value);
    }
  };

  const handleSearch = () => {
    const searchLower = search.toLowerCase();
    const filterArray = persons.filter(person =>
      person.name.toLowerCase().includes(searchLower)
    );
    setFiltered(filterArray);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    if (newName.length > 0 && number.length > 0) {
        if (!existingPerson) {
            const newPerson = {
                name: newName,
                number: number,
                id: persons.length + 1
            };

            personService.create(newPerson).then(createdPerson => {
                setPersons([...persons, createdPerson]);
                setNewName('');
                setNumber('');
                  setMessaage(`Added ${newPerson.name}`)
                  setTimeout(() => {
                    setMessaage(null)
                  }, 5000)
            });
        } else if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
            const updatedPerson = { ...existingPerson, number};
            personService.update(existingPerson.id, updatedPerson).then(returnedPerson =>
              setPersons(persons.map(lastPerson => lastPerson.id !== existingPerson.id ? lastPerson : returnedPerson )))
            .catch(error => {
                console.error('Error updating person:', error);
                alert("An error occurred while updating the person's information.");
            });
        }
    } else {
        alert("Empty Fields");
    }
};


  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(personToDelete.id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
        alert("You pressed OK!");
      }).catch(error => {
        console.error('Error deleting person:', error);
        setMessaage(`${personToDelete.name} has already been removed from server`)
        setTimeout(() => {
          setMessaage(null)
        }, 5000)
      });
    } else {
      alert("You canceled!");
    }
  };

  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification message={message}/>
      <SearchFeature search={search} handleChange={handleChange} />
      <PersonForm

        onSubmit={handleSubmit}
        newName={newName}
        handleChange={handleChange}
        number={number}
      />
      <h2>Numbers</h2>
      <PersonList persons={filtered} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
