const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data:[]
  };
  
  const reducersUsers = (state = initialState, action) => {
    // console.log("omah", action.payload)
    switch (action.type) {
      case 'GET_USERS_PENDING':
        return {
          ...state,
          isLoading: true
        };
  
      case 'GET_USERS_FULFILLED':
        return {
          ...state,
          isSuccess: true,
          isLoading: false,
          data: action.payload.data
        };
        
      case 'GET_USERS_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        };
      default:
        return state;
    }
  };
  
  export default reducersUsers;