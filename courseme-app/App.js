import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './Screens/Login';
import AgendaScreen from './Screens/AgendaScreen';

import firebase from 'react-native-firebase';

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>HomePage</Text>
            </View>
        )
    }
} 
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black'
    }
})
class CalendarScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Calendar</Text>
            </View>
        )
    }
}
const TabNavigator = createBottomTabNavigator({
  Login: LoginScreen,
  Home: HomeScreen,
  Agenda: AgendaScreen
});
export default createAppContainer(TabNavigator);
/* Old App.js
import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import { Agenda } from 'react-native-calendars';

import firebase from 'react-native-firebase';

// Screens
import DatabaseDemo from './DatabaseDemo/DatabaseDemo';
import MainScreen from './Screens/MainScreen';
import GroupScreen from './Screens/GroupScreen';
import LoginScreen from './Screens/Login';

// Create navigator containing all screens
const AppNavigator = createStackNavigator(
  {
    MainScreen: MainScreen,
    GroupScreen: GroupScreen,
    LoginScreen: LoginScreen
  },
  {
    initialRouteName: 'LoginScreen'
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
 */