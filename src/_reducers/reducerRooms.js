const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: []
};

const reducersRooms = (state = initialState, action) => {
  // console.log('papa',action.payload)
  switch (action.type) {
    case 'GET_ROOMS_PENDING':
      return {
        ...state,
        isLoading: true
      };

    case 'GET_ROOMS_FULFILLED':
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        data: action.payload.data
      };
      
    case 'GET_ROOMS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

export default reducersRooms;