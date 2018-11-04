import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View} from 'react-native';

import firebase from 'react-native-firebase';


export default class Firebase_test_component extends Component<Props> {
  
  constructor(){
      super();
      this.state = {
      serverTime = firebase.database().getServerTime();          
      }
  } 
  
  static defaultProps = {
      
  }
  
  render() {
    return (
      <View>
        {serverTime}
      </View>
    );
  }
}

AppRegistry.registerComponent('Firebase_test_component', () => Firebase_test_component)