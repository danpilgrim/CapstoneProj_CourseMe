import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from 'react-native';

import firebase from 'react-native-firebase';

export default class ClassView extends React.Component {
    
    constructor() {
        super();
        this.state = {
            classList: []
        }
    }

    render() {
      return (
        <View style={{padding: 20}}>
            <ScrollView contentContainerStyle={styles.container}>
                {
                    this.state.classList.map((item, index) => (
                        <View key={item.id}>
                            <Text>{item.id}, {item.name}, {item.professor}, {item.days}</Text>
                        </View>
                    ))
                }
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
            this.createClassList(snapshot.val())
        }.bind(this));
    }

    createClassList(classes)
    {
        var classesArray = [];
        for (key in classes)
        {
            // The class ids are the names of the properties
            classes[key].id = key;
            classesArray.push(classes[key]);
        }
        this.setState({classList: classesArray});
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20
    }
})