import axios from 'axios';


const api = axios.create({
  baseURL:   'http://localhost:3001' || process.env.REACT_APP_URL_HEROKU,
})


export default api;