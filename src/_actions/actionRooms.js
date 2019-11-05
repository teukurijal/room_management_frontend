// import axios from 'axios'
import axiosInstance from '../service/baseUrl';

export const getRooms = (token) => ({
    type: 'GET_ROOMS',
    payload:  axiosInstance({
      method:'GET',
      url:'/rooms',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
  });