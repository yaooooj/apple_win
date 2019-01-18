import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';

//默认应用的容器组件
export default class Order extends Component {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            oldtext:'',
        };
    }

    //输入框文字改变时会调用
    updateText(newText) {
        this.setState((oldState) => {
            console.log(oldState);//老的状态值
            return {
                text: newText,
            }
        }, this.updateTextDone)

    }

    //文字状态值改变，界面渲染完毕后调用
    updateTextDone() {
        console.log("文字状态值改变，界面渲染完毕!");
    }

    render() {
        return (
            <View style={[styles.flex, styles.topStatus]}>
                <TextInput style={styles.input}
                           onChangeText={ (newText) => this.updateText(newText) }/>
                <Text style={styles.tip}>已输入{this.state.text.length}个文字</Text>
                <Text style={styles.tip}>老的状态{this.state.text}</Text>
            </View>
        );
    }
}

//样式定义
const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    topStatus: {
        marginTop: 25,
    },
    input: {
        height: 45,
        borderWidth: 1,
        marginLeft: 5,
        paddingLeft: 5,
        borderColor: '#ccc',
        borderRadius: 4
    },
    tip: {
        marginLeft: 5,
        marginTop: 5,
        color: '#C0C0C0',
    }
});
