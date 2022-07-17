import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteEntry = (person, { id }) => {
    const request = axios.delete(baseUrl + '/' + id, person)
    return request.then(console.log(`${person.name} was deleted`))
}

export default { getAll, create, deleteEntry }