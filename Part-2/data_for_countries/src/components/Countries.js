import React from 'react'
import DisplayCountryInfo from './DisplayCountryInfo'


const Countries = ({ countries, handleClick, countryClicked, countryWeather}) => {
    if (countries.length <= 10) { 
        if (countries.length === 1) return (
            <DisplayCountryInfo country={countries[0]} countryWeather={countryWeather} /> 
            )
        else return (
            <>
                <div>
                    {countries.map((country) =>
                        <div key={country.name.common}>{country.name.common}
                            <button onClick={() => handleClick(country)}
                            >show </button>
                        </div>  
                    )} 
                </div>
                <div>
                    <DisplayCountryInfo country={countryClicked} countryWeather={countryWeather} />
                </div>
            </>
        )
    } else return (
        <p>Too many matches. Please specify another filter.</p>
    )

}


export default Countries