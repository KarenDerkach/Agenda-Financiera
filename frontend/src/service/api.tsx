import axios from 'axios';


const api = axios.create({
  baseURL:   'http://localhost:3001' || 'https://agile-stream-37029.herokuapp.com',
})


export default api;