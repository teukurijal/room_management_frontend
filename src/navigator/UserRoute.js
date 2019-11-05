import {createStackNavigator} from 'react-navigation-stack';
// import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

import BottomTabNavigator from './BottomTabNavigator';
import RoomScreen from '../component/RoomScreen'


const UserRoute = createStackNavigator({
  BottomTabNavigator: {
    screen: BottomTabNavigator,
    navigationOptions: {
      header: null,
    },
  },
});

export default UserRoute;
