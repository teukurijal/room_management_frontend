import React from 'react';
import { Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';

import RoomScreen from '../component/RoomScreen';
import CustomerScreen from '../component/CustomerScreen';
import CheckinScreen from '../component/CheckinScreen';
import SettingScreen from '../component/SettingScreen';

import theme from '../component/style'
import Header from '../component/Header';

const CheckinStack = createStackNavigator({
  CheckinStack: {
    screen: CheckinScreen,
    navigationOptions: {
      title: 'CHECKIN',
      headerStyle: {
        // backgroundColor: theme.PRIMARY_COLOR,
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
        justifyContent:'center',
        alignSelf:'center',
        textAlign:'center',
        flexGrow:1
      },
    },
  },
});
const RoomStack = createStackNavigator({
  RoomStack: {
    screen: RoomScreen,
    navigationOptions: {
      title: 'ROOMS',
      headerStyle: {
        // backgroundColor: theme.PRIMARY_COLOR,
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
        justifyContent:'center',
        alignSelf:'center',
        textAlign:'center',
        flexGrow:1
      },
      // header: (
      //   <Header name='ROOMS' />
      // )
    },
  },
});
const CustomerStack = createStackNavigator({
  CustomerStack: {
    screen: CustomerScreen,
    navigationOptions: {
      title: 'CUSTOMERS',
      headerStyle: {
        // backgroundColor: '#583CAA',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        justifyContent:'center',
        alignSelf:'center',
        textAlign:'center',
        flexGrow:1
      },
    },
  },
});
const SettingStack = createStackNavigator({
  SettingStack: {
    screen: SettingScreen,
    navigationOptions: {
      title: 'SETTING',
      headerStyle: {
        backgroundColor: '#583CAA',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        justifyContent:'center',
        alignSelf:'center',
        textAlign:'center',
        flexGrow:1
      },
    },
  },
});

const BottomTabNavigator = createBottomTabNavigator(
  {
    Checkin: {
      screen: CheckinStack,
      navigationOptions: {
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[focused ? {color: '#51a1e4'} : {color: 'grey'}, { textAlign: 'center', fontSize: 10 }]}>
              CHECKIN
            </Text>
          )
        },
        tabBarIcon: ({focused}) => {
          return (
            <Icon
              name="check-circle"
              style={focused ? {color: '#51a1e4'} : {color: 'grey'}}
              size={22} />
          )
        },
      },
    },
    Room: {
      screen: RoomStack,
      navigationOptions: {
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[focused ? {color: '#51a1e4'} : {color: 'grey'}, { textAlign: 'center', fontSize: 10 }]}>
              ROOM
            </Text>
          )
        },
        tabBarIcon: ({focused}) => {
          return (
            <Icon5
              name="bed"
              style={focused ? {color: '#51a1e4'} : {color: 'grey'}}
              size={23} />
          )
        }
      },
    },
    Customer: {
      screen: CustomerStack,
      navigationOptions: {
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[focused ? {color: '#51a1e4'} : {color: 'grey'}, { textAlign: 'center', fontSize: 10 }]}>
              CUSTOMER
            </Text>
          )
        },
        tabBarIcon: ({focused}) => {
          return (
            <Icon
              name="users"
              style={focused ? {color: '#51a1e4'} : {color: 'grey'}}
              size={20} />
          )
        }
      },
    },
    Setting: {
      screen: SettingScreen,
      header:null,
      navigationOptions: {
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[focused ? {color: '#51a1e4'} : {color: 'grey'}, { textAlign: 'center', fontSize: 10 }]}>
              SETTING
            </Text>
          )
        },
        tabBarIcon: ({focused}) => {
          return (
            <Icon2
              name="md-settings"
              style={focused ? {color: '#51a1e4'} : {color: 'grey'}}
              size={20} />
          )
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#000000',
      inactiveTintColor: '#777777',
      labelStyle: {
        fontSize: 8,
      },
      style: {
        backgroundColor: 'white',
        padding: 5,
        shadowOffset: {width: 20, height: 20},
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 5,
      },
    },
  },
);
export default BottomTabNavigator;
