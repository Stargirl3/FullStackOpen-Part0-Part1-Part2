import React from "react";
import Person from './Person'


//Renders the contacts in the phonebok
const Persons = ({ persons, deleteEntryOf }) => {
    return (
        <div>
            {persons.map(person =>
                <Person key={person.id} person={person} deleteEntry={() => deleteEntryOf(person.id)} />
            )}
        </div>
    )
}

export default Persons