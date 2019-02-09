import React from 'react';
import { Text, View } from 'react-native';
import firebase from 'react-native-firebase';



export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.authListener = {};
    }


    async componentDidMount() {
        this.authListener = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('AgendaNav');
            }
            else {
                this.props.navigation.navigate('Login');
            }
        });
    }

    async componentWillUnmount() {
        this.authListener();
    }


    render() {
        return (
            <View>
                <Text>
                    Loading...
                </Text>
            </View>
        )
    }
}

