import React from 'react';
import { View } from 'react-native'

import ClassWrite from './ClassWrite';
import ClassView from './ClassView';

export default class DatabaseDemo extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <ClassWrite style={{flex: 1}}/>
                <ClassView style={{flex: 1}}/>               
            </View>
        )
    }
}