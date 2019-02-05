import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Agenda } from 'react-native-calendars';

import firebase from 'react-native-firebase';

export default class AgendaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      group: {},
      planner: {},
      assignments: {}
    };
  }

  async componentDidMount()
  {
    this.loadUser();
  }

  render() {
    return (  
      <Agenda
      items={this.state.assignments}
      selected={'2019-02-05'}
      renderItem={this.renderAssignment.bind(this)}
      renderEmptyDate={this.renderEmptyDate.bind(this)}
      rowHasChanged={this.rowHasChanged.bind(this)}
      
    /> 
    );
  }

  loadUser()
    {
      firebase.database().ref('users/user1').once('value',
          function (snapshot) 
          {
              var user = snapshot.val();
              user.id = snapshot.key;

              this.setState({user: user});
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
            this.loadAssignments();   
        }.bind(this));
    }

    loadAssignments()
    {
        Object.keys(this.state.planner.assignments).forEach(asgnId => {
          firebase.database().ref(`assignments/${asgnId}`).on('value', snapshot => {
            asgn = snapshot.val();
            asgn.id = asgnId;

            // Locally keyed under due date for agenda, must be in array
            if (this.state.assignments[asgn.dateDue] == null)
            {
              this.state.assignments[asgn.dateDue] = [asgn];
            }
            else if (this.state.assignments[asgn.dateDue].find(asgn => asgn.id === asgnId) == null)
            {
              this.state.assignments[asgn.dateDue].push(asgn);
            }

            this.setState({assignments: this.state.assignments});
          }); 
        });
    }

  renderAssignment(asgn) {
    return (
      <Assignment
      title={asgn.title}
      dateDue={asgn.dateDue}
      timeDue={asgn.timeDue}
      description={asgn.description}
      />
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

class Assignment extends React.Component {
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <View style={[styles.item, {height: 100}]}>
      <Text>{this.props.title}</Text>
      <Text>Date Due: {this.props.dateDue} {this.props.timeDue}</Text>
      <Text>{this.props.description}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});