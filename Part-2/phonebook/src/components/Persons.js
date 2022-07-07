import React from "react";
import Person from './Person'

//Renders the contacts in the phonebok
const Persons = ({ persons }) => (
    <div>
        {persons.map(person =>
            <Person key={person.id} person={person} />
        )}
    </div>
)

export default Persons