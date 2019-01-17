import React, {Component} from 'react';
import {  View, Text,Image, PixelRatio,StyleSheet, Platform, Alert, ToastAndroid, SafeAreaView, StatusBar} from "react-native";
import PropTypes from 'prop-types';

import AntDesign from 'react-native-vector-icons/AntDesign';

import px2dp from '../../util/px2dp';
import Button from '../../component/Button';
import SmsCaptchaInput from '../../component/SmsCaptureInput';
import PhoneNumInput from '../../component/NumberInput';
import Validator from '../../util/validator';


export default class Login extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: "登录",
        };
    };

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#046ada');
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }



    constructor(props){
        super(props);
        this.mockSuccess = true;
        this.state = { inputBtnDisabled: false,};
        this.onPressBtn = this.onPressBtn.bind(this);
        this.onStop = this.onStop.bind(this);


        this.onPress = this.onPress.bind(this);
        // 验证器初始化
        const validator = new Validator();
        this.validator = validator;
        this.collectValidate = validator.collect;
        this.state = {errorMessage: PropTypes.string }
    }



    onPressBtn(start, stop) {
        this.setState({
            inputBtnDisabled: true,
        });
        // console.log('请求发短信接口');
        // mock
        setTimeout(() => {
            if (this.mockSuccess) {
                start();
            } else {
                Alert.alert('获取验证码失败，请重试');
                stop();
            }
            this.mockSuccess = !this.mockSuccess;
        }, 2000);
    }

    onStop(){
        this.setState({
            inputBtnDisabled: false,
        });
    }

    onChangeText(captcha, name) {
        console.log(captcha, name);
    }

    onPress(){
        const res = this.validator.run();
        if (res.err === 0){
            console.warn(res.err);
        }else {
            ToastAndroid.showWithGravityAndOffset(
                res.data.msg,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                0,
                -350,
            )
        }
    }

    render() {
        //let v = this.state.show ? <Text style={{color: 'red'}}>{ this.state.msg }</Text> : null;
        return (
        <View style={styles.view}>
                <View style={styles.logo}>
                    <Image  style={{width:px2dp(45), height:px2dp(45)}} source={require('../../image/ic_login_logo.png')}/>
                    <Text style={{margin: 20, color: '#bbb'}}>
                        让借钱变得更简单
                    </Text>
                </View>
                <View style={styles.editGroup}>
                    <View style={styles.editView1}>
                        <PhoneNumInput
                            style={styles.edit}
                            collectValidate={this.collectValidate}
                            placeholderTextColor="#c4c4c4"
                        />
                    </View>
                    <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
                    <View style={styles.editView2}>
                        <SmsCaptchaInput
                            style={styles.inputContainer}
                            inputStyle={styles.input}
                            btnTextStyle={[styles.buttonText, {
                                color: this.state.inputBtnDisabled ? '#999' : '#046ada',
                            }]}
                            placeholder="输入验证码"
                            intervalTime={30}
                            onPressBtn={this.onPressBtn}
                            btnStyle={styles.btn}
                            btnTextInital="发送验证码"
                            btnTextSending="发送中..."
                            btnTextTiming="重发{time}s"
                            btnTextTimed="重新发送"
                            placeholderTextColor="#c4c4c4"
                            activeOpacity={0.7}
                            onStop={this.onStop}
                            codeLength={6}
                            onChangeText={this.onChangeText}
                            collectValidate={this.collectValidate}
                        />
                    </View>
                    <View style={{marginTop: px2dp(10), height: px2dp(40)}}>
                        <Button text="登录" onPress={this.onPress}/>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff'
    },
    actionBar:{
        marginTop: (Platform.OS === 'ios') ? px2dp(10) : 0,
    },
    logo:{
        alignItems: 'center',
        marginTop: px2dp(40)
    },
    edit:{
        height: px2dp(40),
        backgroundColor: '#fff',
        paddingLeft: px2dp(15),
        paddingRight: px2dp(15)
    },
    editView1:{
        height: px2dp(48),
        backgroundColor:'white',
        justifyContent: 'center',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },
    editView2:{
        height: px2dp(48),
        backgroundColor:'white',
        justifyContent: 'center',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },
    editGroup:{
        margin: px2dp(20)
    },
    textButtonLine:{
        marginTop: px2dp(12),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    thirdPartyView:{
        flex: 1,
        marginTop: px2dp(10),
        flexDirection:'row',
        alignItems: 'flex-start',
        justifyContent:'space-around'
    }

});