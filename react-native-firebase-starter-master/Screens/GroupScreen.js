import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import firebase from 'react-native-firebase';

export default class GroupScreen extends React.Component {
    constructor()
    {
        super();
        this.state = {
            user: {},
            group: {},
            planner: {},
            assignmentList: [],
            status: ""
        }
    }

    async componentDidMount()
    {
        this.loadUser();
    }
    
    render()
    {
        return (
            <View>
                <Text style={styles.title}>Test Group Planner</Text>
                <Text>User: {JSON.stringify(this.state.user)}</Text>
                <Text>Group: {JSON.stringify(this.state.group)}</Text>
                <Text>Planner: {JSON.stringify(this.state.planner)}</Text>
                <Text>Assignments:</Text>
                <ScrollView contentContainerStyle={styles.container}>
                {
                    this.state.assignmentList.map((item) => (
                        <View key={item.id}>
                            <Text>{item.id}, {item.title}, {item.description}</Text>
                            
                        </View>
                    ))
                }
                </ScrollView>
                <Text>Status: {this.state.status}</Text>
            </View>
        )
    }

    loadUser()
    {
        firebase.database().ref('users/user1').once('value',
            function (snapshot) 
            {
                var user = snapshot.val();
                user.id = snapshot.key;

                this.setState({user: user});
                
            }.bind(this))
            .then(
            function (snapshot)
            {
                this.loadGroup();
            }.bind(this));
    }

    loadGroup()
    {
        // Need the key, value is irrelevant 
        firebase.database().ref(`groups/${Object.keys(this.state.user.groups)[0]}`).once('value',
        function (snapshot) {
            
            var group = snapshot.val();
            group.id = snapshot.key;

            this.setState({group: group});   
        }.bind(this))
        .then(
            function (snapshot)
            {
                this.loadPlanner();
            }.bind(this));
    }

    loadPlanner()
    {
        // Need the key, value is irrelevant 
        firebase.database().ref(`planners/${Object.keys(this.state.group.planner)[0]}`).on('value',
        function (snapshot) {

            var planner = snapshot.val();
            planner.id = snapshot.key;

            this.setState({planner: planner});   
        }.bind(this))
        .then(
        function (snapshot)
        {
            this.loadAssignments();
        }.bind(this));
    }

    loadAssignments()
    {
        
    }


    
}

const styles = StyleSheet.create({
    title: {
        justifyContent: 'center'
    },
    container: {
        paddingVertical: 20
    }
})