import axios from 'axios';


const api = axios.create({
  baseURL:   process.env.REACT_APP_URL_HEROKU||'http://localhost:3001' ,
})


export default api;