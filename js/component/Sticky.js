'use strict';

import React,{ Component } from 'react';
import PropTypes from 'prop-types'
import ReactNative, {Text, View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Image,ViewPropTypes} from 'react-native';
import px2dp from '../util/px2dp';
import Icon  from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';

export default class ImageButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            //isSelect: false,
        }
    }

    static propTypes = {
        text: PropTypes.string,
        image: PropTypes.number,
        icon: PropTypes.string,
        onPress: PropTypes.func,
        imgSize: PropTypes.number,
        fontSize: PropTypes.number,
        color: PropTypes.string,
        btnStyle:  ViewPropTypes.style,
        isSelect: PropTypes.bool,
        defaultColor: PropTypes.string,
    };

    static defaultProps = {
        imgSize: px2dp(40),
        fontSize: px2dp(13),
        defaultColor: '#ccc',
        isSelect: false,
    };

    render() {
        const {image, icon, onPress} = this.props;

        if (Platform.OS === 'ios') {
            if (image) {
                return (
                    <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                        {this._renderContentWithImage()}
                    </TouchableOpacity>
                );
            } else if (icon) {
                return (
                    <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                        {this._renderContentWithIcon()}
                    </TouchableOpacity>
                );
            }
        } else if (Platform.OS === 'android') {
            if (image) {
                return (
                    <TouchableNativeFeedback onPress={onPress}>
                        {this._renderContentWithImage()}
                    </TouchableNativeFeedback>
                );
            } else if (icon) {
                return (
                    <TouchableNativeFeedback onPress={onPress}>
                        {this._renderContentWithIcon()}
                    </TouchableNativeFeedback>
                );
            }
        }
    }

    _renderContentWithImage(){
        const {text, image, color, imgSize, fontSize, btnStyle, defaultColor} = this.props;
        return(
            <View style={[styles.view, btnStyle]}>
                <Image source={image} style={{width: imgSize, height: imgSize}}/>
                {text ?
                    <Text style={[styles.text, {fontSize: fontSize, color: this.props.isSelect ? color: defaultColor}]}>{text}</Text>
                    :
                    null
                }
            </View>
        );
    }

    _renderContentWithIcon(){
        const {text, icon, color, imgSize, fontSize, btnStyle, defaultColor} = this.props;
        return(
            <View style={[styles.view, btnStyle]}>
                <Icon name={icon} size={imgSize} color={this.props.isSelect ? color: defaultColor}/>
                {text ?
                    <Text style={{fontSize: fontSize, color: this.props.isSelect ? color: defaultColor}}>{text}</Text>
                    :
                    null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7,
        //backgroundColor: 'rgba(224,224,224,0.5)'
    },
    text:{
        color: 'rgba(255,255,255,0.7)',
        marginTop: px2dp(4)
    }
});