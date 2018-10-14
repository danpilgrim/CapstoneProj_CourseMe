import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Component1 extends Component<Props> {
  
  constructor(){
      super();
      this.state = {
          name: 'Brad',
          showName: true,
          message: 'Hello there'
      }
  } 
  
  static defaultProps = {
      message: 'Hi there'
  }
  
  render() {
      let name = this.state.showName ? this.state.name : 'No name'
    return (
      <View >
        <Text></Text>
        <Text>{name}</Text>
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Component1', () => Component1)