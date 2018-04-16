import React from 'react';
import {
  TabNavigator,
  StackNavigator,
  NavigationActions,
} from 'react-navigation';

import HomeScreen from '../components/HomeScreen';
import SignInScreen from '../components/SignInScreen';
import SignUpScreen from '../components/SignUpScreen';

const SessionTabs = TabNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'SignIn',
    navigationOptions: {
      tabBarVisible: false,
    },
  },
);

const AppNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Session: {
      screen: SessionTabs,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    mode: 'modal',
  },
);

export default AppNavigator;
