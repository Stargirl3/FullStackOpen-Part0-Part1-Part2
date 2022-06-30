import React from 'react'


const DisplayCountryInfo = ({ country, countryWeather }) => {
    
    if (Object.keys(country).length === 0) return (
        <div></div>
    )
    else if (Object.keys(countryWeather).length !== 0) return (
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
            
            <h2>Weather in {country.name.common}</h2>
            <div>temperature: {(countryWeather.main.temp - 273.15).toFixed(2)}°C</div>
            <img src={`https://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`} alt='' />
            <div>wind: {countryWeather.wind.speed} m/s</div>
            <br/>
        </div>
    )
    else return null
   
 }


export default DisplayCountryInfo