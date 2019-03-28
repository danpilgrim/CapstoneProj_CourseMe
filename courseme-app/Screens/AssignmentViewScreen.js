import React from 'react';
import { Text, View, Button } from 'react-native';
import firebase from 'react-native-firebase';



export default class AssignmentViewScreen extends React.Component {

    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => {
        return {
          headerRight: (
            <Button
            title='Delete'
            color ='black'
            onPress = {() => this.props.deleteEvent()}
            />
          )
        };
    }
    render() {
        const fallbackVal = { title: '', description: '', dateAssigned: '', dateDue: '', timeDue: '' };
        const asgn = this.props.navigation.getParam('asgn', fallbackVal);
        //const dbRef = firesebase.database().ref('asgn/');

        return (
            <View>
                <Text>Title: {asgn.title}</Text>
                <Text>Description: {asgn.description}</Text>
                <Text>Date Assigned: {asgn.dateAssigned}</Text>
                <Text>Date Due: {asgn.dateDue} {asgn.timeDue}</Text>
            </View>
        )
        
    }
    deleteEvent(){
        firebase.database().ref('asgn/').remove();
       // .then(() => this.props.navigation.navigate('Agenda'))
    }
}