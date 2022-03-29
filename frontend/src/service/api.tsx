import axios from 'axios';


const {
  REACT_APP_URL_HEROKU
} = process.env

const api = axios.create({
  baseURL:  REACT_APP_URL_HEROKU || 'http://localhost:3001',
})


export default api;