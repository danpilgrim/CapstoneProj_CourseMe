import React from 'react';
import { Text, Button, View } from 'react-native';

import firebase from 'react-native-firebase';


export default class AssignmentViewScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            asgn: {}
        };
    }

    async componentDidMount()
    {
        const fallbackVal = { id: -1, title: 'ERR', description: '', dateAssigned: '', dateDue: '', timeDue: '' };
        this.setState({asgn: this.props.navigation.getParam('asgn', fallbackVal)});
    }

    render() {
        const fallbackVal = { id: '', title: '', description: '', dateAssigned: '', dateDue: '', timeDue: '' };
        const asgn = this.props.navigation.getParam('asgn', fallbackVal);

        return (
            <View>
                <Text>Id: {this.state.asgn.id}</Text>
                <Text>Title: {this.state.asgn.title}</Text>
                <Text>Description: {this.state.asgn.description}</Text>
                <Text>Date Assigned: {this.state.asgn.dateAssigned}</Text>
                <Text>Date Due: {this.state.asgn.dateDue} {this.state.asgn.timeDue}</Text>
                <Button 
                title='Edit'
                onPress={() => {
                    console.log(this.state.asgn);
                    this.props.navigation.navigate('AssignmentEdit', {asgn: this.state.asgn})
                }}/>
                <Button
                onPress={() => this.deleteEvent(asgn)}
                title = "Delete"
                color="black"
                />
            </View>
        )
    }

    deleteEvent(asgn) {

        let id = asgn.id
        firebase.database().ref(`assignments/${id}`).remove();
        this.props.navigation.navigate('Agenda')
    }

}