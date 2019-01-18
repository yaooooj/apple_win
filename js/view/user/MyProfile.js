import React, {Component,} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, ScrollView, Switch, TextInput,TouchableNativeFeedback, TouchableOpacity, Platform, PixelRatio, AsyncStorage, SafeAreaView} from 'react-native';
import px2dp from '../../util/px2dp';
import theme from '../../config/theme';
import PageComponent from './BackPageComponent';
import my_profile_data from "../../data/myprofile";
import ActionSheet from 'react-native-general-actionsheet';
import {storage} from '../../util/storage';

let obj = {};
obj.name = '张三';
obj.phone_num = '123';
obj.mail = '123';
obj.id_num = '123';
obj.city = '深圳';
obj.degree = '大专';
obj.marital = '';



export default class SettingPage extends Component{
    static navigationOptions = {
        title: '我的资料'
    };

    constructor(props){
        super(props);
        storage.save("myproflie", obj);
        console.warn(2);
        this.state = {
            name: "",
            phone_num: "",
            mail: "",
            id_card: "",
            city: "",
            degree: "",
            marital: "",
            isHasSwitch: PropTypes.bool,
        };
        console.warn(3)
    }

    static propTypes = {
        name: PropTypes.string,
        phone_num: PropTypes.string,
        mail: PropTypes.string,
        id_card: PropTypes.func,
        city: PropTypes.bool,
        degree: PropTypes.bool,
        marital: PropTypes.bool,
        isHasSwitch: PropTypes.string,
    };

    //准备加载组件
    componentWillMount() {
        console.warn("componentWillMount");
        storage.load(
            "myprofile",
            (data) => {
                this.props.name = data.name
            })
    }

    componentDidMount() {
        console.warn("componentDidMount")
        storage.load(
            "myprofile",
            (data) => {
                this.setState({name:data.name});
                this.setState({phone_num:data.phone_num});
                this.setState({mail:data.mail});
                this.setState({id_card:data.id_card});
                this.setState({city:data.city});
            })
    }


    getkey(){
        storage.load(
            "myprofile",
            (data) => {
                this.setState({marital:data.marital});
        })
    }



    _onPressCallback(position){
        switch (position) {
            case 0:
                this.sheetList(['未婚',"已婚",'取消'],2, "婚姻");
                break;
            case 1:
                this.sheetList(['大专', "本科", '硕士', "其他", '取消'],4, "学历");
                break;
            case 2:
                this.getkey()
        }
    }

    sheetList(list, num, sheet){
        ActionSheet.showActionSheetWithOptions(
            {
                options: list,
                cancelButtonIndex: num,
            },
            (buttonIndex) => {
                if (sheet==="学历") {
                    switch (buttonIndex) {
                        case 0:
                            this.setState({degree:"大专",});
                            break;
                        case 1:
                            this.setState({degree: "本科",});
                            break;
                        case 2:
                            this.setState({degree: "硕士",});
                            break;
                        case 3:
                            this.setState({degree: "其他",});
                            break;
                    }
                }else {
                    switch (buttonIndex) {
                        case 0:
                            this.setState({marital:"未婚",});
                            obj.marital = "未婚";
                            storage.save("myprofile", obj);
                            this.setState({isHasSwitcher: false,});
                            break;
                        case 1:
                            this.setState({marital: "已婚",});
                            this.setState({isHasSwitcher: true,});
                            break;
                    }
                }
            },
        );
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <ScrollView>
                    <View style={styles.list}>
                        <Item text="姓名" isHasInput={true} placeholder={"请输入姓名"} value={this.state.name}/>
                        <Item text="手机号" isHasInput={true} placeholder={"请输入手机号"} value={this.state.phone_num}/>
                        <Item text="邮箱" isHasInput={true} placeholder={"请输入邮箱"} value={this.state.mail}/>
                        <Item text="身份证" isHasInput={true} placeholder={this.state.isHasSwitcher?" ":"请输入身份证号"}/>
                        <Item text="所在城市" subText={"请选择"} isHasSwitcher={this.state.isHasSwitcher} onPress={this._onPressCallback.bind(this, 2)}/>
                        <Item text="文化程度" subText={this.state.degree?this.state.degree:"请选择"} onPress={this._onPressCallback.bind(this, 1)}/>
                        <Item text="婚姻状况" subText={this.state.marital?this.state.marital:"请选择"} onPress={this._onPressCallback.bind(this, 0)}/>
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
            text: this.props.value,
            switchIsOn: this.props.switcherValue,
            text1: '',
            onTextChange: this.props.onPress,
            newText: this.props.length,
        };
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        textColor: PropTypes.string,
        subText: PropTypes.string,
        onPress: PropTypes.func,
        isHasSwitcher: PropTypes.bool,
        isHasInput: PropTypes.bool,
        switcherValue: PropTypes.bool,
        placeholder: PropTypes.string,
        value: PropTypes.string,
    };

    static defaultProps = {
        textColor: '#000',
        switcherValue: false,
        text: '',
    };

    handleChange(text1){
        //this.setState({text1});
        this.setState((oldtext) => {
            return {
                text1: text1
            }
        })
    }

    testBlur(){

        this.refs.inputWR.blur();
    }

    validLength(){
        //alert(this.state.text.length)
        if (this.state.text1.length <= 0){
            return null
        }
        if (this.state.text1.length < 11) {
            switch (this.props.text) {
                case "姓名":
                    break;
                case "手机":
                    alert("手机号码为11位");
                    break
            }
        }
    }

    render(){
        const {text, textColor, subText, onPress, isHasSwitcher, switcherValue, isHasInput, placeholder} = this.props;
        if(Platform.OS === 'android'){
            return(
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.listItem}>
                        <Text style={{color: textColor, fontSize: px2dp(12)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text style={{color: "#000"}}>{subText}</Text>
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
                                <TextInput
                                    multiline = {true}
                                    numberOfLines = {1}
                                    placeholder = {placeholder}
                                    maxLength={20}
                                    onChangeText={ (text1) => this.handleChange(text1)}
                                    value={this.state.text}
                                    onBlur={()=> { this.validLength()}}
                                    onSubmitEditing={()=>{this.testBlur()}}
                                />
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
                            <Text style={{color: "#ccc"}}>{subText}</Text>
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
                                    onChangeText={ (text) => this.handleChange.bind(this, text)}
                                    value={this.state.text}
                                    onEndEditing={()=> { this.validLength()}}
                                    onSubmitEditing={()=>{this.testBlur()}}/>
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