import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    
    this.authListener = {};
    this.plannerListener = {};
    this.asgnListeners = [];
  }

  async componentDidMount()
  {
    authListener = firebase.auth().onAuthStateChanged(user => {
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

  async componentWillUnmount()
  {
    this.authListener();
    this.plannerListener();
    this.asgnListeners.forEach(offFunc => offFunc());
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

  /**
   * Loads the current user who is signed in.
   * @param {*} user The firebase user object.
   */
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
        this.plannerListener = firebase.database().ref(`planners/${Object.keys(this.state.group.planner)[0]}`).on('value',
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
          let asgnListener = firebase.database().ref(`assignments/${asgnId}`).on('value', snapshot => {
            asgn = snapshot.val();
            asgn.id = asgnId;
            
            // Locally keyed under due date for agenda, must be in array

            // New date entry
            if (this.state.assignments[asgn.dateDue] == null)
            {
              this.state.assignments[asgn.dateDue] = [asgn];
            }
            // Add to date entry
            else if (this.state.assignments[asgn.dateDue].find(asgn => asgn.id === asgnId) == null)
            {
              this.state.assignments[asgn.dateDue].push(asgn);
            }
            // Edit date entry
            else
            {
              let index = this.state.assignments[asgn.dateDue].findIndex(asgn => asgn.id === asgnId);
              this.state.assignments[asgn.dateDue][index] = asgn;
            }

            let updated = {};
            Object.keys(this.state.assignments).forEach(key => updated[key] = this.state.assignments[key]);

            this.setState({assignments: updated});
          });
          this.asgnListeners.push(asgnListener);
        });
    }

    /**
     * From react-native-calendar code on github, will try to find nicer way to fill in blank dates.
     * @param {*} day 
     */
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

  /**
   * Displays an assignment component.
   * @param {*} asgn 
   */
  renderAssignment(asgn) {
    return (
      <Assignment
      onPress={() => this.props.navigation.navigate('AssignmentView', {asgn: asgn})}
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
    return r1 !== r2;
  }

  /**
   * Convert time to just the date in a YYYY-MM-DD format.
   * @param {*} time 
   */
  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

/**
 * A component that displays a single assignment for use within the agenda.
 */
export class Assignment extends React.Component {
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.item, {height: 100}]}>
          <Text>{this.props.title}</Text>
          <Text>Date Due: {this.props.dateDue} {this.props.timeDue}</Text>
          <Text>{this.props.description}</Text>
        </View>
      </TouchableOpacity>
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