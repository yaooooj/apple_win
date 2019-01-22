import React, {Component} from 'react';
import {View, Text, StatusBar, Platform, StyleSheet, Image, ScrollView, Dimensions,TextInput} from "react-native";
import theme from '../../config/theme';
import Button from "../../component/Button";
import ImageButton from  '../../component/Sticky';
//import ImageButton from "../../component/ImageButton";


import {Card, ThemeProvider} from 'react-native-elements';

import IndicatorBanner from "../../component/IndicatorBanner";
import PagerDotIndicator from "../../component/PageDotIndicator";




let width = Dimensions.get('window').width;//得到屏幕宽度



export default class HomeView extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: "Home",
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '3000',
            autoFocus: false,
            isSelect: false,
            staging3: true,
            staging6: false,
            staging9: false,
            staging12: false,
            staging18: false,
            staging1: false,
        };
    }

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            if (Platform.OS === "android"){
                StatusBar.setBackgroundColor(theme.pageBck);
            }
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    onPressMoney(){
        //this.setState({text:})
        //alert('hit me')
    }

    onPress(number){
        switch (number) {
            case 3:
                this.clearAllState();
                if (!this.state.staging3){
                    this.setState({staging3: true})
                }else {
                    this.setState({staging3: false})
                }
                break;
            case 6:
                this.clearAllState();
                if (!this.state.staging6){
                    this.setState({staging6: true})
                }else {
                    this.setState({staging6: false})
                }
                break;
            case 9:
                this.clearAllState();
                if (!this.state.staging9){
                    this.setState({staging9: true})
                }else {
                    this.setState({staging9: false})
                }
                break;
            case 12:
                this.clearAllState();
                if (!this.state.staging12){
                    this.setState({staging12: true})
                }else {
                    this.setState({staging12: false})
                }
                break;
            case 18:
                this.clearAllState();
                if (!this.state.staging18){
                    this.setState({staging18: true})
                }else {
                    this.setState({staging18: false})
                }
                break;
            case '自定义':
                this.clearAllState();
                if (!this.state.staging1){
                    this.setState({staging1: true})
                }else {
                    this.setState({staging1: false})
                }
        }
    }

    clearAllState(){
        this.setState({
            staging3: false,
            staging6: false,
            staging9: false,
            staging12: false,
            staging18: false,
            staging1: false,
        })
    }


    home_image_button(number,iconname, isSelect){
        let re = /^[0-9]+.?[0-9]*/;
        return (
            <View style={{width: 100, height: 53,  marginLeft:10, padding: 5 ,marginTop:5}}>
                <ImageButton
                    text={re.test(number)? number + '期' : '自定义'}
                    onPress={this.onPress.bind(this, number)}
                    backgroundColor={theme.textColor}
                    icon={iconname}
                    color={theme.textColor}
                    imgSize={30}
                    isSelect={isSelect}
                />
            </View>
        )
    }

    costumTextInput(){
        return (
            <View style={{flex:1,  marginLeft: 15,}}>
                <TextInput
                    style={{alignSelf: 'center', fontWeight: 'bold', color: theme.textColor}}
                    keyboardType={'numeric'}
                    //backgroundColor = '#fff'
                    fontSize = {25}
                    placeholder = {'3期'}
                    placeholderTextColor = {theme.textColor}
                    onChangeText={ (text1) => this.onPressMoney(text1)}
                    //value={this.state.text}
                    //autoFocus={}
                    underlineColorAndroid={'transparent'}
                />
            </View>
        )
    }

    //{this.home_image_button(12,'ios-cart', this.state.staging12)}
    //{this.home_image_button(18,'ios-car', this.state.staging18)}
    //{this.home_image_button('自定义','ios-airplane', this.state.staging1)}

    home_button = (id)=> {
        return (
                id === 'row1' ?
                    <View style={{flex:1, flexDirection: 'row' ,justifyContent: 'space-between'}}>
                        {this.home_image_button(3 ,'ios-phone-portrait', this.state.staging3)}
                        {this.home_image_button(6,'ios-camera',this.state.staging6)}
                        {this.home_image_button(9,'ios-laptop', this.state.staging9)}
                    </View>
                    :
                    <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between',marginTop:10}}>
                        {this.costumTextInput()}
                    </View>
        );
    };

    money = () => {
      return (
          <Card onPress={this.onPressCard}>
              <TextInput
                  keyboardType={'numeric'}
                  //backgroundColor = '#fff'
                  fontSize = {25}
                  style={{alignSelf: 'center', fontWeight: 'bold', color: theme.textColor}}
                  placeholder = {'3000'}
                  placeholderTextColor = {theme.textColor}
                  onChangeText={ (text1) => this.onPressMoney(text1)}
                  //value={this.state.text}
                  //autoFocus={}
                  underlineColorAndroid={'transparent'}
              />
          </Card>
      )
    };

    commitButton(){
        alert('提交成功')
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3}/>;
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column',  justifyContent: 'flex-start', marginTop:10}}>
                <ScrollView >
                    <View style={{ flex: 1, flexDirection: 'column',  justifyContent: 'flex-start', marginTop:10, marginLeft: 15}}>
                        <Text style={{fontWeight: 'bold'}}>申请金额</Text>
                    </View>
                    <View style={styles.money} >
                        {this.money()}
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column',  justifyContent: 'flex-start', marginTop:10, marginLeft: 15}}>
                        <Text style={{fontWeight: 'bold'}}>选择分期数</Text>
                    </View>
                    <Card>
                        {this.home_button('row1')}
                        {this.home_button('row2')}
                    </Card>
                    <View style={styles.commit}>
                        <View>
                            <Button text={'申请'} onPress={this.commitButton} backgroundColor={theme.textColor}/>
                        </View>
                    </View>
                    <View style={styles.banner}>
                        <IndicatorBanner
                            style={{height:200, flex:1, backgroundColor:'white'}}
                            autoPlayEnable
                            indicator={this._renderDotIndicator()}
                        >
                            <View style={{backgroundColor:theme.textColor}}>
                                <Text>page one</Text>
                            </View>
                            <View style={{backgroundColor:'cornflowerblue'}}>
                                <Text>page two</Text>
                            </View>
                            <View style={{backgroundColor:'#1AA094'}}>
                                <Text>page three</Text>
                            </View>
                        </IndicatorBanner>
                    </View>
                    <View style={styles.more}>

                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    top_scroll:{
        //backgroundColor: theme.textColor,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin:10,
        padding: 20,
        backgroundColor: theme.pageBck,

    },
    bottom:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: "center",
        margin: 20,
    },
    money:{

    },
    staging:{

    },
    commit:{
        marginTop: 20,
        margin: 15,
    },
    banner:{
        marginTop: 15,
    },
    more:{

    },
    img:{
        height: 50,
        width:100
    }
});