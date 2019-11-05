import {createStackNavigator} from 'react-navigation-stack';

import Login from '../component/Login';
import RegisterScreen from '../component/RegisterScreen';

const MainRoute = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Logout: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null,
    },
  },
});

export default MainRoute;
