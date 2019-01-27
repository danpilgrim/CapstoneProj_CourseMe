/*
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

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
  Home: HomeScreen,
  Calendar: CalendarScreen,
});

export default createAppContainer(TabNavigator);

*/

import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
import Login from './components/Login'
import RegisterPage from './components/RegisterPage'
import HomePage from './components/HomePage'

const RootStack = createStackNavigator({
  Login: {
    screen: Login
  },
  RegisterPage: {
    screen: RegisterPage
  },
  HomePage: {
      screen: HomePage
  }
});

const App = createAppContainer(RootStack);

export default App;

