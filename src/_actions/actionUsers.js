import axiosInstance from '../service/baseUrl';

export const getUsers = (useremail, password) => ({
    type: 'GET_USERS',
    payload:  axiosInstance({
      method:'POST',
      url:'/login',
      data: {
          email: useremail,
          password: password
      }
    })
  });