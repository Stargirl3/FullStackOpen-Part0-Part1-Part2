import React, { useState, useEffect } from 'react'
import axios from 'axios'



//renders the search form
const SearchForCountry = ({ value, handleSearch }) => (
  <form>
    <div>
      Find Countries By Name:
      <input
        value={value}
        onChange={handleSearch}
      />
    </div>
  </form>
)


//displays countries that contain the string being searched. if more than 10 results, it asks for a more specific filter. when just one country meets the criteria it displays capital, population, languages spoken and the flag of that country
const Countries = ({ countries }) => {
  if (countries.length <= 10) {
    if (countries.length === 1) return (
      <div>
        <h2>{countries[0].name.common}</h2>
        <div>capital: {countries[0].capital}</div>
        <div>population: {countries[0].population}</div>
        <h3>languages</h3>
        <ul>
         {Object.values(countries[0].languages).map(language =>
          <Language key={language.toString()} language={language} />
        )}
        </ul>
        <br/>
        <img src={Object.values(countries[0].flags)[0].toString()} alt='' />
        
      </div>
    )
    else return (
      <div>
        {countries.map((country) =>
          <Country key={country.name.common} country={country.name.common}/>)}
      </div>
    )}
  else return (
    <p>Too many matches. Please specify another filter.</p>
    )
}


//displays each individual country
function Country ({ country }) {
  return (
    <div>{country}</div>
  )
}

//displays language of a country
function Language({ language }) {
  return (
    <li>{language}</li>
  )
}


//main app
const App = () => {

  //variables declared with 'useState' so that they re-render each time they're changed
  const [countries, setCountries] = useState([])
  const [countrySearch, setCountrySearch] = useState('')
  const [showNone, setShowNone] = useState(true)
  const none = []


  //fetches data from serves using the 'axios'-library and 'useEffect' hook
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  // Updates 'countrySearch' with the string being searched and sets 'showNone' to 'true' if the search box is empty or 'false' if something is being typed 
  const handleSearch = (event) => {
    setCountrySearch(event.target.value.toLowerCase())
    
    if (event.target.value === '') setShowNone(true)
    else setShowNone(false)
  }

  

  // If search box is empty, returns empty array, else returns list of countries that contain the search string
  const countriesToShow = showNone
    ? none
    : countries.filter(country => (country.name.common.toLowerCase().indexOf(countrySearch) !== -1))
  


  return (
    <>
      <SearchForCountry value={countrySearch} handleSearch={handleSearch} />

      <br />
      <Countries countries={countriesToShow} />
    </>
  )
}

export default App;
