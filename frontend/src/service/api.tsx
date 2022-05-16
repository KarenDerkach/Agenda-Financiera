import axios from 'axios';


const api = axios.create({
  baseURL:   'http://localhost:3001' || 'https://agenda-aplication.herokuapp.com',
})


export default api;