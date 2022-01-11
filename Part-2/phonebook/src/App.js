import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <div>{person.name}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  /* checks if the new name already exists in the phonebook and if it does it issues a warning and doesn't add it. Otherwise, it adds it to the phonebook*/
  const addPerson = (event) => {
    event.preventDefault()
    console.log(persons);
    
    const nameExists = (person) => person.name === newName
    if (persons.some(nameExists)) alert(`${newName} is already added to the phonebook`)
    else {
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')    
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </div>
    </>
  )
}

export default App
