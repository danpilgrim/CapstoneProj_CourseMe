import React from 'react';
import { View, Text, Button } from 'react-native'

export default class MainScreen extends React.Component {
    render()
    {
        return (
            <View>
                <Text>Hello World</Text>
                <Button
                    title="New Screen"
                    onPress={() => this.props.navigation.navigate('New')}
                />
            </View>
        )
    }
}