import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Agenda } from 'react-native-calendars';

import firebase from 'react-native-firebase';

export default class AssignmentViewScreen extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const fallbackVal = {title: '', description: '', dateAssigned: '', dateDue: '', timeDue: ''};
        const asgn = this.props.navigation.getParam('asgn', fallbackVal);

        return (
            <View>
                <Text>Title: {asgn.title}</Text>
                <Text>Description: {asgn.description}</Text>
                <Text>Date Assigned: {asgn.dateAssigned}</Text>
                <Text>Date Due: {asgn.dateDue} {asgn.timeDue}</Text>
            </View>
        )
    }
}