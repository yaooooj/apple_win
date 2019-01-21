import React, {Component} from 'react';
import {View, Text, StatusBar, Platform, StyleSheet, Image, ScrollView, Dimensions,TextInput} from "react-native";
import theme from '../../config/theme';
import Button from "../../component/Button";
import ImageButton from "../../component/ImageButton";
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



    home_image_button(number,iconname){
        return (
            <View style={{width: 100, height: 53,  marginLeft:10, padding: 5 ,marginTop:5}}>
                <ImageButton
                    text={number+ '期'}
                    onPress={this.onPress}
                    backgroundColor={theme.textColor}
                    icon={iconname}
                    color={'#ccc'}
                    imgSize={30}
                />
            </View>
        )
    }


    home_button = (id)=> {
        return (
                id === 'row1' ?
                    <View style={{flex:1, flexDirection: 'row'}}>
                        {this.home_image_button(3,'ios-phone-portrait')}
                        {this.home_image_button(6,'ios-camera')}
                        {this.home_image_button(9,'ios-laptop')}
                    </View>
                    :
                    <View style={{flex:1, flexDirection: 'row'}}>
                        {this.home_image_button(12,'ios-cart')}
                        {this.home_image_button(18,'ios-car')}
                        {this.home_image_button('自定义','ios-airplane')}
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
                            style={{height:200, flex:1, paddingTop:20, backgroundColor:'white'}}
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
        margin: 15,
    },
    more:{

    },
    img:{
        height: 50,
        width:100
    }
});