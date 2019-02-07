import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';


import firebase from 'react-native-firebase';

export default class SplashScreen extends React.Component {
    constructor(props)
    {
        super(props);
    }

    async componentDidMount()
    {
        firebase.auth().onAuthStateChanged(user => {
            if (user)
            {
                this.props.navigation.navigate('Agenda');
            }
            else
            {
                this.props.navigation.navigate('Login');
            }
        });
    }

    render()
    {
        return (
            <View>
                <Text>
                    Loading...
                </Text>
            </View>
        )
    }
}

