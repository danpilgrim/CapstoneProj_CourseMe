import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import AgendaScreen from './Screens/AgendaScreen';
import AssignmentViewScreen from './Screens/AssignmentViewScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import SplashScreen from './Screens/SplashScreen';
import AssignmentEditScreen from './Screens/AssignmentEditScreen';
import AssignmentAddScreen from './Screens/AssignmentAddScreen';

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
  AssignmentView: AssignmentViewScreen,
  AssignmentEdit: AssignmentEditScreen,
  AssignmentAdd: AssignmentAddScreen
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
