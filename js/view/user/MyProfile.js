import React, {Component,} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, ScrollView, Switch, TextInput,TouchableNativeFeedback, TouchableOpacity, Platform, PixelRatio, AsyncStorage, SafeAreaView} from 'react-native';
import px2dp from '../../util/px2dp';
import theme from '../../config/theme';
import PageComponent from './BackPageComponent';
import my_profile_data from "../../data/myprofile";
import ActionSheet from 'react-native-general-actionsheet';
import DeviceStorage from '../../util/storage';


export default class SettingPage extends Component{
    static navigationOptions = {
        title: '我的资料'
    };

    constructor(props){
        super(props);
        this.state = {
            name: PropTypes.string,
            phone_num: PropTypes.string,
            mail: PropTypes.string,
            id_card: PropTypes.string,
            city: PropTypes.string,
            degree: PropTypes.bool,
            marital: PropTypes.string,
            isHasSwitch: PropTypes.bool,
        };
    }



    onInitProfile(){
        if (DeviceStorage.get(this.state.name) == null){

        }
    }

    _onPressCallback(position){
        switch (position) {
            case 0:
                this.sheetList(['未婚',"已婚",'取消'],2);
                break;
            case 1:
                this.sheetList(['大专', "本科", '硕士', "其他", '取消'],4);
                break;
        }
    }

    sheetList(list, num){
        ActionSheet.showActionSheetWithOptions(
            {
                options: list,
                cancelButtonIndex: num,
            },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        this.state.marital = "未婚";
                        break;
                    case 1:
                        this.state.marital = "未婚";
                        alert("this is 1")
                }
            },
        );
    }


    render(){
        const { isHasSwitch, marital} = this.state;
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <ScrollView>
                    <View style={styles.list}>
                        <Item text="姓名"
                              isHasInput={(my_profile_data.my_profile.name==null)}
                              subText={my_profile_data.my_profile.name!=null?my_profile_data.my_profile.name:""}
                              placeholder={my_profile_data.my_profile.name!=null?my_profile_data.my_profile.name:"请输入姓名"}
                        />
                        <Item text="手机号"
                              isHasInput={true}
                              subText={my_profile_data.my_profile.phone_num!=null?my_profile_data.my_profile.phone_num:""}
                              placeholder={my_profile_data.my_profile.phone_num==null?my_profile_data.my_profile.phone_num:"请输入手机号"}
                        />
                        <Item text="邮箱" isHasInput={true}  />
                        <Item text="身份证" isHasInput={true} />
                        <Item text="所在城市" subText={"请选择"} isHasSwitcher={true}/>
                        <Item text="文化程度" subText={"请选择"} isHasSwitcher={this.state.isHasSwitch} onPress={this._onPressCallback.bind(this, 1)}/>
                        <Item text="婚姻状况" subText={marital} onPress={this._onPressCallback.bind(this, 0)}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

class Item extends Component{
    constructor(props){
        super(props);
        this.state = {
            switchIsOn: this.props.switcherValue,
            isHasSwitcher: PropTypes.bool,
            subText1: PropTypes.string = this.subText,
        };
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        textColor: PropTypes.string,
        subText: PropTypes.string,
        onPress: PropTypes.func,

        isHasInput: PropTypes.bool,
        switcherValue: PropTypes.bool,
        placeholder: PropTypes.string,
    };

    static defaultProps = {
        textColor: '#000',
        switcherValue: false,
        text: '',
    };

    render(){
        const {text, textColor,  onPress, isHasSwitcher, switcherValue, isHasInput, placeholder} = this.props;
        const {subText1} = this.state;

        if(Platform.OS === 'android'){
            return(
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.listItem}>
                        <Text style={{color: textColor, fontSize: px2dp(12)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text style={{color: "#000"}}>{subText1}</Text>
                            { isHasSwitcher ?
                                <SafeAreaView>
                                    <Switch
                                        onValueChange={(value) => this.setState({switchIsOn: value})}
                                        style={{marginLeft: px2dp(5)}}
                                        value={this.state.switchIsOn}/>
                                </SafeAreaView>
                                :
                                null
                            }
                            { isHasInput ?
                                <SafeAreaView>
                                    <TextInput
                                        multiline = {true}
                                        numberOfLines = {1}
                                        placeholder = {placeholder}
                                        onChangeText={(text) => this.setState({text})}
                                        value={this.state.text}/>
                                </SafeAreaView>
                                :
                                null
                            }
                        </View>
                    </View>
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                    <View style={styles.listItem}>
                        <Text style={{color: textColor, fontSize: px2dp(15)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text style={{color: "#ccc"}}>{subText1}</Text>
                            { isHasSwitcher ?
                                <Switch
                                    onValueChange={(value) => this.setState({switchIsOn: value})}
                                    style={{marginLeft: px2dp(5)}}
                                    value={this.state.switchIsOn}/>
                                :
                                null
                            }
                            { isHasInput ?
                                <TextInput
                                    multiline = {true}
                                    numberOfLines = {1}
                                    placeholder = {placeholder}
                                    onChangeText={(text) => this.setState({text})}
                                    value={this.state.text}/>
                                :
                                null
                            }

                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}


const styles = StyleSheet.create({
    list:{
        borderTopWidth: 1/PixelRatio.get(),
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(12)
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
        borderBottomWidth: 1/PixelRatio.get()*2
    },
});