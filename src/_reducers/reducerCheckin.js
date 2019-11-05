const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: []
  };
  
  const reducersCheckin = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_CHECKIN_PENDING':
        return {
          ...state,
          isLoading: true
        };
  
      case 'GET_CHECKIN_FULFILLED':
        return {
          ...state,
          isSuccess: true,
          isLoading: false,
          data: action.payload.data
        };
        
      case 'GET_CHECKIN_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        };
      default:
        return state;
    }
  };
  
  export default reducersCheckin;