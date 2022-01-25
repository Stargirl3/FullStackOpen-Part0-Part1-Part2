import React, { useState, useEffect } from 'react'
import axios from 'axios'


/*Renders a search box on the page and handles the event which filters the list of contacts to match the string being searched*/
const Filter = ({ handleSearchChange }) => (
  <div>
    Find a contact by name:
    <input
      onChange={handleSearchChange}
    />
  </div>
)


//Renders the contacts in the phonebok
const Persons = ({ persons }) => (
  <div>
    {persons.map(person =>
      <div key={person.id}>{person.name}, {person.number}</div>
    )}
  </div>
)


//Renders form for adding a new contact to phonebook and handles new additions to the list
const PersonForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      name:
      <input
        value={props.nameValue}
        onChange={props.handleNameChange}
      />
    </div>
    <div>
      number:
      <input
        value={props.numberValue}
        onChange={props.handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)



//Main App
const App = () => {


  /* pieces of State for setting the updated list of contacts, adding a new name and number, searching for a name, and showing the entire phonebook or not*/
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [stringToFind, setStringToFind] = useState('')
  const [showAll, setShowAll] = useState(true)



  /*fetch data from json-server using the 'axios' library and 'useEffect' hook*/
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })  
  }, [])



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



  //sets new name 
  const handleNameChange = (event) => setNewName(event.target.value)

  //sets new number
  const handleNumberChange = (event) => setNewNumber(event.target.value)



  /* sets the string being typed, as 'stringToFind', after it converts it to lowercase. If the search box is empty it sets 'showAll' as TRUE. Otherwise, if someone is currently searching for a name, it sets it as FALSE*/
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
      else return false
    })




  return (
    <>
      <h2>Phonebook</h2>

      <Filter handleSearchChange={handleSearchChange} />

      <h3>Add a new entry</h3>

      <PersonForm
        handleSubmit={addPerson}
        nameValue={newName}
        handleNameChange={handleNameChange}
        numberValue={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} />
    </>
  )
}




export default App
