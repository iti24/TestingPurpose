import axios from 'axios';
const token = localStorage.getItem('token');
// Create an instance of Axios with custom configurations
const axiosInstance = axios.create({
  baseURL:"http://localhost:4000/api",
  headers: {
    Authorization: `${token}`,
  },
});

export default axiosInstance;

