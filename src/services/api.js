//api de comunicação do frontend com o backend
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:3333', //url do backend
})
export default api;