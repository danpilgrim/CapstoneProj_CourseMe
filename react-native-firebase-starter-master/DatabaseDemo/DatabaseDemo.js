import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from 'react-native'

import firebase from 'react-native-firebase'

import ClassWrite from './ClassWrite';
import ClassView from './ClassView';

export default class DatabaseDemo extends React.Component {
    render() {
        return (
            <View>
            <ClassWrite></ClassWrite>
            <ClassView></ClassView>                
            </View>
        )
    }
}