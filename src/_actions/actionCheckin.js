import axiosInstance from '../service/baseUrl';

export const getCheckin = (token) => ({
    type: 'GET_CHECKIN',
    payload:  axiosInstance({
      method:'GET',
      url:'/checkin',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
  });