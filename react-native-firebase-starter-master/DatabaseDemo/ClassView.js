import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from 'react-native'

import firebase from 'react-native-firebase'

export default class ClassView extends React.Component {
    constructor() {
        super();
        this.state = {
            classJson: ""
        }
    }

    render() {
      return (
        <View style={{padding: 20}}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text>{this.state.classJson}</Text>
            </ScrollView>
            <Button
                onPress={() => this.loadClasses()}
                title="Display Classes"
            />
        </View>
      )
    }
 
    loadClasses() {
        var dbRef = firebase.database().ref('classes/').once('value', 
        function (snapshot) {
        this.setState({classJson: JSON.stringify(snapshot.val())})
        }.bind(this));
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20
    }
})