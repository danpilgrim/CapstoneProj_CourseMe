import React from 'react';
import { Button, Keyboard, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import firebase from 'react-native-firebase';

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            message: ''
        }
    }

    async componentDidMount() {

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.nameContainer}>
                    <Text style={styles.title}>CourseMe</Text>
                    <Text styles={styles.titleInfo}>{this.state.message}</Text>
                </View>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container}
                        onPress={Keyboard.dismiss}>
                        <View style={styles.infoContainer}>
                            <TextInput style={styles.input}
                                placeholder="Enter email"
                                placeholderTextColor='black'
                                keyboardType='email-address'
                                returnKeyType='next'
                                autoCorrect={false}
                                onSubmitEditing={() => this.refs.txtPassword.focus()}
                                onChangeText={email => this.setState({ email: email })}
                            />
                            <TextInput style={styles.input}
                                placeholder="Enter password"
                                placeholderTextColor='black'
                                returnKeyType='go'
                                secureTextEntry
                                autoCorrect={false}
                                ref={"txtPassword"}
                                onChangeText={password => this.setState({ password: password })}
                            />
                            <Button style={styles.buttonContainer}
                                title="Sign in"
                                onPress={() => this.loginToFirebase()}>
                            </Button>
                            <Button style={styles.buttonContainer}
                                title="Register"
                                onPress={() => this.props.navigation.navigate('RegisterPage')}>
                            </Button>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }

    loginToFirebase() {
        const email = this.state.email;
        const password = this.state.password;

        if (email != '' && password != '') {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => this.props.navigation.navigate('Agenda'))
                .catch(error => this.setState({ message: error.message }))
        }
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',

    },
    nameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        textAlign: 'center',
        fontSize: 60,
        color: 'black',
        marginTop: 5,
    },
    titleInfo: {
        textAlign: 'center',
        fontSize: 20,
        color: 'red',
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 300,
        padding: 20,
        // backgroundColor: 'red'
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: '#f7c744',
        paddingVertical: 15,
        justifyContent: 'space-between',
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18
    }
})