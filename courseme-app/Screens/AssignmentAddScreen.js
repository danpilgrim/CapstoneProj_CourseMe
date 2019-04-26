import React from 'react';
import { Text, TextInput, Button, View } from 'react-native';

import firebase from 'react-native-firebase';


export default class AssignmentEditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: 'None',
            asgn: {}
        }
    }

    async componentDidMount()
    {
        
    }

    render() {
        
        return (
            <View>
                <Text>Title: </Text>
                <TextInput
                onChangeText={(text) => this.state.asgn.title = text}/>
                <Text>Description:</Text>
                <TextInput
                onChangeText={(text) => this.state.asgn.description = text}/>
                <Text>Date Assigned:</Text>
                <TextInput
                onChangeText={(text) => this.state.asgn.dateAssigned = text}/>
                <Text>Date Due:</Text>
                <TextInput
                onChangeText={(text) => this.state.asgn.dateDue = text}/>
                <Text>Time Due:</Text>
                <TextInput
                onChangeText={(text) => this.state.asgn.timeDue = text}/>
                <Button
                title='Add'
                onPress={() => this.confirm(this.state.asgn)}>
                </Button>
            </View>
        )
    }

    /**
     * Save new entry to database.
     */
    confirm(asgn)
    {
        let completeEntry = true;
        Object.keys(asgn).forEach((key) => {
            if (asgn[key] === '' || asgn[key] === null)
            {
                completeEntry = false;
            }
        });

        if (completeEntry)
        {
            let key = firebase.database().ref(`assignments`).push(asgn).key;
            firebase.database().ref(`planners/planner1/assignments/${key}`).set(true);
            this.props.navigation.navigate('Agenda');
        }
    }
}