import React from 'react';
import { Text, TextInput, Button, View } from 'react-native';

import firebase from 'react-native-firebase';


export default class AssignmentEditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    async componentDidMount()
    {
        
    }

    render() {
        const fallbackVal = { id: '', title: '', description: '', dateAssigned: '', dateDue: '', timeDue: '' };
        const asgn = this.props.navigation.getParam('asgn', fallbackVal);
        
        return (
            <View>
                <Text>Id: {asgn.id}</Text>
                <Text>Title: </Text>
                <TextInput
                placeholder={asgn.title}
                onChangeText={(text) => asgn.title = text}/>
                <Text>Description:</Text>
                <TextInput
                placeholder={asgn.description}
                onChangeText={(text) => asgn.description = text}/>
                <Text>Date Assigned:</Text>
                <TextInput
                placeholder={asgn.dateAssigned}
                onChangeText={(text) => asgn.dateAssigned = text}/>
                <Text>Date Due:</Text>
                <TextInput
                placeholder={asgn.dateDue}
                onChangeText={(text) => asgn.dateDue = text}/>
                <Text>Time Due:</Text>
                <TextInput
                placeholder={asgn.timeDue}
                onChangeText={(text) => asgn.timeDue}/>
                <Button
                title='Confirm'
                onPress={() => this.confirmEdits(asgn)}>
                </Button>
            </View>
        )
    }

    /**
     * Save changed to database.
     */
    confirmEdits(asgn)
    {
        if (asgn.id != '')
        {
            let id = asgn.id;
            delete asgn.id;

            firebase.database().ref(`assignments/${id}`)
            .set(asgn)
            .then(() => this.props.navigation.navigate('AgendaScreen'));
        }
    }
}