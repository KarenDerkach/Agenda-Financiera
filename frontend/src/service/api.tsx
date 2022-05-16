import axios from 'axios';


const api = axios.create({
  baseURL:   'http://localhost:3001' || 'https://agenda-financiera.vercel.app',
})


export default api;