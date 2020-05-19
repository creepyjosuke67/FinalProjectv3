import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/screens/Login';
import Registration from './src/screens/NewUser';
import TopAlbums from './src/screens/List';
import Releases from './src/screens/FinalScreen';

const AppNavigator = createStackNavigator(
{
  Login,
  Registration,
  TopAlbums, 
  Releases,
},
{
  initialRouteName:'Login'
}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
