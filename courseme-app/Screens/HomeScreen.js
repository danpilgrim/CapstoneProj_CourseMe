import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import firebase from 'react-native-firebase';

export default class HomeScreen extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>HomePage</Text>
                <Button 
                title='Sign Out' 
                onPress={this.logOut.bind(this)}
                />
            </View>
        )
    }

    logOut()
    {
      firebase.auth().signOut();
      this.props.navigation.navigate('Auth')
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