import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Component1 extends Component<Props> {
  
  constructor(){
      super();
      this.state = {
          name: 'Brad'
      }
  } 
  
  render() {
    return (
      <View >
        <Text></Text>
        <Text>{this.state.name}</Text>
        <Text>{this.props.message}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Component1', () => Component1)