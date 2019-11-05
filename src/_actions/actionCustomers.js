import axiosInstance from '../service/baseUrl';

export const getCustomers = (token) => ({
    type: 'GET_CUSTOMERS',
    payload:  axiosInstance({
      method:'GET',
      url:'/customers',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
  });