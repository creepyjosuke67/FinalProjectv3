import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/screens/Login';
import NewUser from './src/screens/NewUser';
import List from './src/screens/List';
import FinalScreen from '.src/screens/FinalScreen';

const AppNavigator = createStackNavigator(
{
  Home,
  NewUser,
  List, 
  FinalScreen,
},
{
  initialRouteName:'Home'
}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
