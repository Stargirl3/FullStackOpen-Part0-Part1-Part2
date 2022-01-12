import React, { useState } from 'react'


const Person = ({ person }) => <div>{person.name} - {person.number}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '39-44-5323523', id: 1 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  /* checks if the new name and number already exist in the phonebook and if they do it issues a warning and doesn't add them. Otherwise, they get added to the phonebook, alog with a new ID*/
  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = (person) => person.name === newName
    const numberExists = (person) => person.number === newNumber

    if (persons.some(nameExists)) alert(`${newName} is already in the phonebook`)
    else if (persons.some(numberExists)) alert(`The number: ${newNumber} is already in the phonebook`)
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)


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
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Person key={person.id} person={person} />
        )}
      </div>
    </>
  )
}

export default App
