
import React, {Component} from 'react';
import {Button, Platform, Text, View, SafeAreaView, StatusBar, StyleSheet} from "react-native";

export default class HomeView extends React.Component {
    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: 'Home',
        };
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
                    title="Go Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    red: {
        color: 'red',
    },
});