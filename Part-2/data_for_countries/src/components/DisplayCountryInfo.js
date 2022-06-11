import React from 'react'


const DisplayCountryInfo = ({ country }) => {
    if (Object.keys(country).length === 0) return (
        <div></div>
    )
    else return (
        <div>
            <h2>{country.name.common}</h2>
            <div>capital: {country.capital}</div>
            <div>population: {country.population}</div>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map(language =>
                    <li key={language.toString()} >{language}</li>
                )}
            </ul>
            <br />
            <img src={Object.values(country.flags)[0].toString()} alt='' />
        </div>
    )
   
 }


export default DisplayCountryInfo