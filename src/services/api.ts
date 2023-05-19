//* Libraries imports
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://live.chunk.run/',
});

export default api;