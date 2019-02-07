import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Agenda } from 'react-native-calendars';

import firebase from 'react-native-firebase';

/**
 *  Screen that displays a scrollable agenda.
 */
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
    firebase.auth().onAuthStateChanged(user => {
      if (user)
      {
        this.loadUser(user);
      }
      else
      {
        this.props.navigation.navigate('Auth');
      }
    });
    
  }

  render() {
    return (  
      <Agenda
      items={this.state.assignments}
      loadItemsForMonth={this.loadEmptyDates.bind(this)}
      selected={'2019-02-05'}
      renderItem={this.renderAssignment.bind(this)}
      renderEmptyDate={this.renderEmptyDate.bind(this)}
      rowHasChanged={this.rowHasChanged.bind(this)}
    /> 
    );
  }

  loadUser(user)
    {
      firebase.database().ref(`users/${user.uid}`).once('value',
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

            var updated = {};
            Object.keys(this.state.assignments).forEach(key => updated[key] = this.state.assignments[key]);

            this.setState({assignments: updated});
          }); 
        });
    }

    // From react-native-calendar code on github, will try to find nicer way to fill in blank dates
    loadEmptyDates(day)
    {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (this.state.assignments[strTime] == null) {
          this.state.assignments[strTime] = [];
        }
      }

      var updated = {};
      Object.keys(this.state.assignments).forEach(key => updated[key] = this.state.assignments[key]);

      this.setState({assignments: updated});
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
      <View style={styles.emptyDate}>
      </View>
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

/**
 * A component that displays a single assignment for use within the agenda.
 */
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