import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './Screens/LoginScreen';
import AgendaScreen from './Screens/AgendaScreen';
import SplashScreen from './Screens/SplashScreen';
import HomeScreen from './Screens/HomeScreen';


import firebase from 'react-native-firebase';
import AssignmentViewScreen from './Screens/AssignmentViewScreen';


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

/**
 * The screens concerning authentication of the user.
 */
const authStackNav = createStackNavigator({
  Login: LoginScreen
})

/**
 * The screens for viewing and editing agenda entries.
 */
const agendaStackNav = createStackNavigator({
  Agenda: AgendaScreen,
  AssignmentView: AssignmentViewScreen
},
{
  initialRouteName: 'Agenda'
})

/**
 * The tab screens in the app.
 */
const appTabNav = createBottomTabNavigator({
  Home: HomeScreen,
  AgendaNav: agendaStackNav
},
{
  initialRouteName: 'AgendaNav'
});


/**
 * The top level of the application. A composition of the other navigators.
 */
export default createAppContainer(createSwitchNavigator({
  Splash: SplashScreen,
  Auth: authStackNav,
  App: appTabNav
},
{
  initialRouteName: 'Splash'
}
));
