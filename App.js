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

import AntDesign from "react-native-vector-icons/AntDesign";

import HomeView from './js/view/home/HomeView';
import DetailsView from './js/view/home/DetailsView';
import Order from './js/view/order/Order';

import Login from './js/view/user/Login';
import About from "./js/view/user/About";
import Profile from "./js/view/user/Profile";
import MyProfile from "./js/view/user/MyProfile"
import theme from "./js/config/theme";



const HomeStack = createStackNavigator(
    {
        Home: {screen: HomeView,},
        Details: {screen: DetailsView,},
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: theme.pageBck,
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
        Login: Login,
        About: About,
        Profile: Profile,
        MyProfile: MyProfile,
    },
    {
        initialRouteName: "Profile",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: theme.pageBck,
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
        Oder: { screen: Order },
    },
      {
        initialRouteName: "Oder",
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