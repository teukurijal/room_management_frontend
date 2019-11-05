import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.100.6:9000/api/v2',
});

module.exports = axiosInstance;
