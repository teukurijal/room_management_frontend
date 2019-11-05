import { combineReducers } from 'redux';

import reducerRooms from './reducerRooms';
import reducersUsers from './reducersUsers';
import reducerCustomers from './reducerCustomers'
import reducersCheckin from './reducerCheckin';

//The Global State
const appReducer = combineReducers({
    customers: reducerCustomers,
    rooms: reducerRooms,
    users: reducersUsers,
    checkin: reducersCheckin
})

export default appReducer