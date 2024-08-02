import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});



export default instance;
