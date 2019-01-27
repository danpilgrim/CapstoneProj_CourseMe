import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
//import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
export default class HomePage extends Component {
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
/*
const TabNavigator = createBottomTabNavigator({
    HomePage: HomePage,
    Calendar: Calendar,
  });
  
  export default createAppContainer(TabNavigator);
  */
  