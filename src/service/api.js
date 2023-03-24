import axios from "axios"

const api = axios.create({
    baseURL: 'https://random-word-api.herokuapp.com/'
})

export default api