import axios from 'axios'

const baseURL = 'http://192.168.29.217:5555';
const client = axios.create({
    baseURL
})

export default client
