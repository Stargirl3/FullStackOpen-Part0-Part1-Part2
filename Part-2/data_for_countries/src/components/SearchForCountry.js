import React from 'react'

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
  export default SearchForCountry