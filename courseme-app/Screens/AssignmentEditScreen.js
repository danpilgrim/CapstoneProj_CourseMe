import React from 'react';
import { Text, TextInput, Button, View } from 'react-native';

import firebase from 'react-native-firebase';


export default class AssignmentEditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: 'None'
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
                <Text>Error: {this.state.errorMsg}</Text>
                <Text>Id: {asgn.id}</Text>
                <Text>Title: </Text>
                <TextInput
                placeholder={asgn.title}
                onChangeText={(text) => asgn.title = text.length? text : asgn.title}/>
                <Text>Description:</Text>
                <TextInput
                placeholder={asgn.description}
                onChangeText={(text) => asgn.description = text.length? text : asgn.description}/>
                <Text>Date Assigned:</Text>
                <TextInput
                placeholder={asgn.dateAssigned}
                onChangeText={(text) => asgn.dateAssigned = text.length? text : asgn.dateAssigned}/>
                <Text>Date Due:</Text>
                <TextInput
                placeholder={asgn.dateDue}
                onChangeText={(text) => asgn.dateDue = text.length? text : asgn.dateDue}/>
                <Text>Time Due:</Text>
                <TextInput
                placeholder={asgn.timeDue}
                onChangeText={(text) => asgn.timeDue = text.length? text : asgn.timeDue}/>
                <Text>Class:</Text>
                <TextInput
                placeholder={asgn.class}
                onChangeText={(text) => asgn.class = text.length? text : asgn.class}/>
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
        if (asgn.id && asgn.id != '')
        {
            let id = asgn.id;
            let asgnCopy = { title: asgn.title, description: asgn.description, dateAssigned: asgn.dateAssigned, dateDue: asgn.dateDue, timeDue: asgn.timeDue, class: asgn.class}

            firebase.database().ref(`assignments/${id}`)
            .set(asgnCopy, () => this.props.navigation.navigate('Agenda'))
            .catch((error) => this.setState({errorMsg: error.message}));
        }
    }
}