import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, Button, TextInput } from 'react-native';

import firebase from 'react-native-firebase';

export default class DatabaseTest extends React.Component {
  constructor() {
    super();
    this.state = {
      classId: "",
      className: "",
      professor: "",
      days: ""
    };
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return (
      <View style={{padding: 50}}>
        <Text>Testing...</Text>
        <TextInput
          style={{height: 20}}
          placeholder="Class ID"
          onChangeText={(text) => this.setState({classId: text})}
        />
        <TextInput
          style={{height: 20}}
          placeholder="Class Name"
          onChangeText={(text) => this.setState({className: text})}
        />
        <TextInput
          style={{height: 20}}
          placeholder="Professor"
          onChangeText={(text) => this.setState({professor: text})}
        />
        <TextInput
          style={{height: 20}}
          placeholder="Days"
          onChangeText={(text) => this.setState({days: text})}
        />
        <Button
          onPress={() => this.createClass(this.state.classId, this.state.className, this.state.professor, 
            this.state.days)}
          title="Create New Entry"
        />
      </View>
    );
  }

  
  createClass(id, name, professor, days) {
    var classInfo = {name: name, professor: professor, days: days};
    var dbRef = firebase.database().ref('classes/' + id);
    dbRef.set(classInfo);
  }
}



