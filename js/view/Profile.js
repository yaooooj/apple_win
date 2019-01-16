
import React, {Component} from 'react';
import {Button, Platform, Text, View, SafeAreaView, StatusBar, StyleSheet} from "react-native";

export default class Profile extends React.Component {
    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: 'Profile',
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

            <View style={styles.container}>
                <View style={styles.profile}>
                    <Text>Details Screen</Text>
                    <Button
                        title="Go Details"
                        onPress={() => this.props.navigation.navigate('Details')}
                    />
                </View>
                <View>
                    <Text>Profile List</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile:{
        alignItems: "center",
        justifyContent: "center"
    },
    red: {
        color: 'red',
    },
});