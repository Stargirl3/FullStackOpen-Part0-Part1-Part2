import React, { useState } from 'react'


const Person = (props) => <div>{props.person.name}, {props.person.number}</div>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '39-44-5323523', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [stringToFind, setStringToFind] = useState('')
  const [showAll, setShowAll] = useState(true)



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

  /* sets the string being typed as 'stringToFind' after it converts it to lowercase. If the search box is empty it sets 'showAll' as TRUE. Otherwise, if someone is currently searching for a name, it sets it as FALSE*/
  const handleSearchChange = (event) => {
    setStringToFind(event.target.value.toLowerCase())

    if (event.target.value === '') setShowAll(true)
    else setShowAll(false)
  }

  /*If showAll === TRUE it shows the entire phonebook, otherwise it shows a new array that only contains contacts whose name contains the string being currently searched */
  const personsToShow = showAll
    ? persons
    : persons.filter(person => {
      if (person.name.toLowerCase().indexOf(stringToFind) !== -1) return true
    })


  return (
    <>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <div>
        Find a contact by name:
        <input
          onChange={handleSearchChange}
        />
      </div>
      <h2>Add a new entry</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
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
        {personsToShow.map(person =>
          <Person key={person.id} person={person} />
        )}
      </div>
    </>
  )
}

export default App
