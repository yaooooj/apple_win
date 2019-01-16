import {
    Button,
    PixelRatio,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from "react-native";
import React, {Component} from 'react';
import theme from "../config/theme";
import px2dp from "../util/px2dp";
import Avatar from "./test";
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from "prop-types";

export default class SettingView extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };
    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.list}>
                        <Item icon="md-heart" text="我的申请" subText="15篇" iconColor="#32cd32" onPress={this._onPressCallback.bind(this, 2)}/>
                        <Item icon="md-eye" text="我的资料" subText="15篇" onPress={this._onPressCallback.bind(this, 3)}/>
                    </View>
                    <View style={styles.list}>
                        <Item icon="md-settings" text="设置" onPress={this._onPressCallback.bind(this, 6)}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

class Item extends Component{
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

    render(){
        const {icon, iconColor, text, subText, onPress} = this.props;

        if(Platform.OS === 'android'){
            return(
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
        }else if(Platform.OS === 'ios'){
            return(
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
    },
});