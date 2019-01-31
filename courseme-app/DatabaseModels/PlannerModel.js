import firebase from 'react-native-firebase';


// The idea is to encapsulate the database operations to a few simpler operations
// that set the state of the component.
export default class Planner extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            assignmentList: []
        }
    }

    async componentDidMount()
    {

    }

}