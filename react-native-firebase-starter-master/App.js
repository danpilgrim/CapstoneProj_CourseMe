import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import firebase from 'react-native-firebase';

// Screens
import DatabaseDemo from './DatabaseDemo/DatabaseDemo';
import MainScreen from './Screens/MainScreen';
import NewScreen from './Screens/NewScreen';

// Create navigator containing all screens
const AppNavigator = createStackNavigator(
  {
    Main: MainScreen,
    New: NewScreen
  },
  {
    initialRouteName: 'Main'
  }
);

// Wrap the navigator
const AppContainer = createAppContainer(AppNavigator);

// export 
export default class App extends React.Component {
  render()
  {
    return <AppContainer/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
