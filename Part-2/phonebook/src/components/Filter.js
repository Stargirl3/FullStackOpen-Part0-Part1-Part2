import React from 'react'

/*Renders a search box on the page and handles the event which filters the list of contacts to match the string being searched*/
const Filter = ({ handleSearchChange }) => (
    <div>
        Find a contact by name:
        <input
            onChange={handleSearchChange}
        />
    </div>
)

export default Filter