import React from "react";

//Renders form for adding a new contact to phonebook and handles new additions to the list
const PersonForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <div>
            name:
            <input
                value={props.nameValue}
                onChange={props.handleNameChange}
            />
        </div>
        <div>
            number:
            <input
                value={props.numberValue}
                onChange={props.handleNumberChange}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)


export default PersonForm