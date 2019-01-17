import {Button, Text, View, SafeAreaView, StatusBar} from "react-native";
import React, {Component} from 'react';

export default class DetailsView extends React.Component {
    static navigationOptions = {
        title: 'Details',
    };

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#6a51ae');
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }


    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Details... again"
                    onPress={() => this.props.navigation.push('Details')}
                />
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}

