const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: []
  };
  
  const reducersCustomers = (state = initialState, action) => {
      // console.log("customis", action.payload)
    switch (action.type) {
      case 'GET_CUSTOMERS_PENDING':
        return {
          ...state,
          isLoading: true
        };
  
      case 'GET_CUSTOMERS_FULFILLED':
        return {
          ...state,
          isSuccess: true,
          isLoading: false,
          data: action.payload.data
        };
        
      case 'GET_CUSTOMERS_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        };
      default:
        return state;
    }
  };
  
  export default reducersCustomers;