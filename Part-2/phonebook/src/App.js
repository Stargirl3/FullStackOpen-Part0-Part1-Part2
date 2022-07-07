import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [stringToFind, setStringToFind] = useState('')
  const [showAll, setShowAll] = useState(true)



  /*fetch data from json-server using the 'axios' library and 'useEffect' hook*/
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
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

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
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

  
  //console.log(persons);


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
