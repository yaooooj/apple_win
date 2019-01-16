/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Text, View, Button, ToastAndroid } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from "react-native-vector-icons/AntDesign";

import HomeView from './js/view/HomeView';
import OderView from './js/view/OderView';
import UserView from './js/view/Login';
import DetailsView from './js/view/DetailsView';
import SignView from './js/view/SignView';
import Profile from  './js/view/Profile';
import Test from  './js/view/test';
import SettingView from "./js/view/SettingView";



const HomeStack = createStackNavigator(
    {
        Home: {screen: HomeView,},
        Details: {screen: DetailsView,},
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#6a51ae',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                flex:1,
                fontWeight: 'bold',
                textAlign: 'center'
            },
        },
    }
);

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

const UserStack = createStackNavigator(
    {
        User: { screen: UserView },
        Sign: {screen: SignView },
    },
    {
        initialRouteName: "User",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#046ada',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                flex:1,
                fontWeight: 'bold',
            },
        },
    }
    );

const OderStack = createStackNavigator(
    {
        Oder: { screen: OderView },
        Profile: Profile,
        Test: Test,
        Setting: SettingView,
    },
      {
        initialRouteName: "Test",
          defaultNavigationOptions: {
              headerStyle: {
                  backgroundColor: '#6a51ae',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                  flex:1,
                  fontWeight: 'bold',
              },
          },
      }
);


const getTabIcon = (navigation, focused, activeTintColor ) => {
    const { routeName } = navigation.state;
    let IconComponent = AntDesign;
    let iconName;
    if (focused){
        ToastAndroid
    }
    if (routeName === '借钱') {
        iconName = `home${focused ? '' : ''}`;
        // Sometimes we want to add badges to some icons.
        // You can check the implementation below.
    } else if (routeName === '账单') {
        iconName = `bars${focused ? '' : ''}`;
    }else if (routeName === '我的') {
        iconName = `user${focused ? '' : ''}`;
    }

    // You can return any component that you like here!
    return <IconComponent name={iconName} size={25} color={activeTintColor} />;
};


const TabNavigator = createBottomTabNavigator(
    {
        借钱: {screen:HomeStack,},
        账单: {screen:OderStack,},
        我的: {screen:UserStack,},
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
               // getTabBarIcon(navigation, focused, tintColor),
                getTabIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',

        },
    }
);


export default class App extends Component {
    render() {
        return <AppContainer/>;
    }
}

class ModalScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>This is a modal!</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Dismiss"
                />
            </View>
        );
    }
}


const AppContainer = createAppContainer(TabNavigator);