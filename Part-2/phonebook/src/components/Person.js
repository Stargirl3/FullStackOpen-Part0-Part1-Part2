import React from "react";


const Person = ({ person, deleteEntry }) => (
    <div>
        {person.name},
        {person.number}
        <button onClick={deleteEntry}>Delete</button>
    </div>
)


export default Person