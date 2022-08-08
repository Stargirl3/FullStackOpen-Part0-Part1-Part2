import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
//import axios from 'axios'


const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [stringToFind, setStringToFind] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [successMessage, setSuccessMessage] = useState(null)



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



  /* checks if the new name and that number already exist in the phonebook and if they do it alert the user. If the name exists but the number is different, it asks the user if they'd like to replace the old number and if they agree it uses axios PUT to update the user. Else, if both name and number are new, a new contact gets added to the phonebook*/
  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = (person) => person.name === newName
    const numberExists = (person) => person.number === newNumber

    if (persons.some(nameExists) && persons.some(numberExists)) alert(`This name and number are already in the phonebook.`)
    
    else if (persons.some(numberExists)) alert(`The number: ${newNumber} is already in the phonebook`)
    
    else if (persons.some(nameExists) && !persons.some(numberExists)) {
      window.confirm(`${newName} is already in the phonebook. Replace old number with new number?`)
      
      const personToChange = persons.find(p => p.name === newName)      
      const changedPerson = {...personToChange, number: newNumber}
      
      personService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setSuccessMessage(
            `${newName}'s number was successfully updated`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)


          return setPersons(persons.map(person => person.name !== newName
            ? person
            : returnedPerson))
        })
    }

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
          setNewName('')
          setNewNumber('')
        })
    }
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

  /* gets triggered when a user clicks the 'delete' button visible afetr each phonebook entry. First it locates the entry clicked, opens a window to confirm if the entry should be deleted and once confirmed, deletes the entry and renders the updated phonebook, both using axios*/
  const deleteEntryOf = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deleteEntry(person, { id })

      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons.filter(p => p.id !== id))
          console.log('success')
        })
  
    }
  }


  return (
    <>
      <h2>Phonebook</h2>

      <Notification message={successMessage}/>

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

      <Persons persons={personsToShow} deleteEntryOf={deleteEntryOf} />
    </>
  )
}




export default App
