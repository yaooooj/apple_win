import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    Platform,
    TouchableNativeFeedback,
    TouchableOpacity,
    StyleSheet, PixelRatio, Alert, AlertIOS
} from "react-native";

import Button from '../../component/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from "../../util/px2dp";
import theme from "../../config/theme";
import PropTypes from "prop-types";


export default class About extends React.Component {


    constructor(props) {
        super(props);
        this.state = {};
        this.handleBack = this._handleBack.bind(this);
    }


    _handleBack() {
        alert('logout');
    }


    _onPressCallback(position){
        switch(position){
            case 2:  //collection
                this._alert();
                break;

            case 3:  //read articles
                this._alert();
                break;

            case 4:  //tags
                this._alert();
                break;

            case 5:  //rank
                this._alert("logout");
                break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.list}>
                        <Item icon="md-eye" text="用户协议"  onPress={this._onPressCallback1.bind(this, 2)}/>
                        <Item icon="md-pricetag" text="商务合作"  onPress={this._onPressCallback.bind(this, 3)}/>
                        <Item icon="md-pricetag" text="给个好评吧！"  onPress={this._onPressCallback.bind(this, 4)}/>
                    </View>
                    <View style={styles.list}>
                        { Platform.OS === 'android' ?
                            <TouchableNativeFeedback>
                                <View style={[styles.listItem, {justifyContent: 'center'}]}>
                                    <Text style={{color: 'red', fontSize: px2dp(15)}}>退出登录</Text>
                                </View>
                            </TouchableNativeFeedback>
                            :
                            <TouchableOpacity activeOpacity={theme.btnActiveOpacity} onPress={this._onPressCallback.bind(this, 5)}>
                                <View style={[styles.listItem, {justifyContent: 'center'}]}>
                                    <Text style={{color: 'red', fontSize: px2dp(15)}}>退出登录</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{flexDirection: 'row' , justifyContent: 'center', marginBottom: 30, marginTop: 20}}>
                        <Text style={{color: '#ccc'}}>掘金 3.7.3 - gold.xitu.io</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _alert(msg){
        if(Platform.OS === 'android') {
            Alert.alert(
                'Message',
                {msg},
                [{text: 'OK', onPress: () => {}}]
            );
        }else if(Platform.OS === 'ios'){
            AlertIOS.alert(
                'Message',
                "This function currently isn't available",
                [{text: 'OK', onPress: () => {}}]
            );
        }
    }
}


class Item extends Component {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        iconColor: PropTypes.string,
        text: PropTypes.string.isRequired,
        subText: PropTypes.string,
        onPress: PropTypes.func
    };

    static defaultProps = {
        iconColor: 'gray'
    };


    _handleBack() {
        const navigator = this.props.navigator;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            alert('hello');
            return true;
        }
        return false;
    }

    render() {
        const {icon, iconColor, text, subText, onPress} = this.props;

        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.listItem}>
                        <Icon name={icon} size={px2dp(22)} color={iconColor}/>
                        <Text style={{color: 'black', fontSize: px2dp(15), marginLeft: px2dp(20)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{color: "#ccc"}}>{subText}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            );
        } else if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                    <View style={styles.listItem}>
                        <Icon name={icon} size={px2dp(22)} color={iconColor}/>
                        <Text style={{color: 'black', fontSize: px2dp(15), marginLeft: px2dp(20)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{color: "#ccc"}}>{subText}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    actionBar: {
        height: theme.actionBar.height,
        backgroundColor: theme.actionBar.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
    },
    intro: {
        height: px2dp(100),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: px2dp(20),
        borderTopWidth: 1/PixelRatio.get(),
        borderBottomWidth: 1/PixelRatio.get(),
        borderBottomColor: '#c4c4c4',
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(10)
    },
    list:{
        flex: 1,
        borderTopWidth: 1/PixelRatio.get(),
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(15)
    },
    listItem: {
        flex: 1,
        height: px2dp(47),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(25),
        paddingRight: px2dp(25),
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1/PixelRatio.get()
    }
});