import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    TouchableHighlight,
    ToastAndroid
} from 'react-native';
import theme from '../../config/theme';
import {ThemeProvider, Button, Card, withTheme} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from "prop-types";

let data = [
    {key:'1',name:'张三',text:'我不知道说什么！想说什么然后想想又不知道说什么了！希望最底层的孩子都有梦想，都能有承载梦想的力量！谢谢捐款的朋友，不要忘记那些被忘记的孩子',time:'2017-01-02 10:20:33'},
    {key:'2',name:'xiongshi1998',text:'出生无法选择，但人生可以选择',time:'2017-01-02 10:20:33'},
    {key:'3',name:'2222',text:'过多的关注和曝光会不会对孩子的正常生活有影响？一阵风似的离开后，孩子会不会有点失落？',time:'2017-01-02 10:20:33'},
    {key:'4',name:'2222',text:'说真的没有媒体的报道 谁知道大山深处的苦难啊 希望媒体多多关注社会弱势群体 大山深处还有很多很多的冰花男孩呢',time:'2017-01-02 10:20:33'},
    {key:'5',name:'2222',text:'说真的没有媒体的报道 谁知道大山深处的苦难啊 希望媒体多多关注社会弱势群体 大山深处还有很多很多的冰花男孩呢',time:'2017-01-02 10:20:33'},
    {key:'6',name:'2222',text:'过多的关注和曝光会不会对孩子的正常生活有影响？一阵风似的离开后，孩子会不会有点失落？',time:'2017-01-02 10:20:33'},
    {key:'7',name:'2222',text:'说真的没有媒体的报道 谁知道大山深处的苦难啊 希望媒体多多关注社会弱势群体 大山深处还有很多很多的冰花男孩呢',time:'2017-01-02 10:20:33'},
    {key:'8',name:'2222',text:'说真的没有媒体的报道 谁知道大山深处的苦难啊 希望媒体多多关注社会弱势群体 大山深处还有很多很多的冰花男孩呢',time:'2017-01-02 10:20:33'},
    {key:'9',name:'2222',text:'过多的关注和曝光会不会对孩子的正常生活有影响？一阵风似的离开后，孩子会不会有点失落？',time:'2017-01-02 10:20:33'},
    {key:'10',name:'2222',text:'说真的没有媒体的报道 谁知道大山深处的苦难啊 希望媒体多多关注社会弱势群体 大山深处还有很多很多的冰花男孩呢',time:'2017-01-02 10:20:33'},
    {key:'11',name:'2222',text:'说真的没有媒体的报道 谁知道大山深处的苦难啊 希望媒体多多关注社会弱势群体 大山深处还有很多很多的冰花男孩呢',time:'2017-01-02 10:20:33'}
    ];

let emptyData = [

    ];



//默认应用的容器组件
export default class Order extends Component {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            oldtext:'',
            selected: (new Map(): Map<string, boolean>),
            error: false,
            page: 1,
            refreshing: false,
            data: {},
            totalPage:1
        };
        this.requestData();
    }
    static propTypes = {

    };



    _keyExtractor = (item, index) => item.id;
    _onPressItem = (id: string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {selected};
        });
    };

    handlePress(){
        alert("hit head icon")
    }

    _renderItem = ({item}) => (
        <TouchableHighlight>
            <View style={styles.item}>
                <View style={{flex:2}} >
                    <AntDesign name={'user'} size={33}/>
                </View>
                <View style={{flex:10}}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text onPress={() => this.props.navigation.navigate('dynamicDetail',{name:'6666'})} style={styles.text}>{item.text}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );


    handleRefresh = () =>{
      alert('refresh success')
    };

    requestData = () => {
        if(this.state.page > this.state.totalPage){
            ToastAndroid.show('没有数据啦 !', ToastAndroid.SHORT);
            this.setState({refreshing: false});
            return false;
        }
        const url = "http://192.168.10.119/test2/data.php?page="+this.state.page;
        fetch(url).then(res => {
            console.log('started fetch');
            return res.json();
        }).then(res => {
            this.setState({
                data: [...this.state.data, ...res],
                error: res.error || null,
                refreshing: false,
                totalPage:2
            });
        }).catch(err => {
            console.log('==> fetch error', err);
            this.setState({ error: err, refreshing: false});
        });
    };

    render() {
        return (
            <View style={[styles.flex, styles.topStatus]}>
                <FlatList
                    data={data}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={
                        ()=>(
                            <View style={{backgroundColor:'#EBEBEB',height:5}}>

                            </View>
                        )
                    }
                    ListEmptyComponent={
                        ()=>(
                            <View style={{flex:1, justifyContent: 'center'}}>
                                <Text style={{alignSelf: 'center'}}>暂无数据</Text>
                            </View>
                        )
                    }
                    ListFooterComponent={
                        ()=>(
                            <View style={{height:40,justifyContent:'center',alignItems:'center'}}>
                                <Text>我是有底线的</Text>
                            </View>
                        )
                    }

                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    /*disableVirtualization
                    getItem={}
                    getItemCount={}
                    initialNumToRender={}
                    maxToRenderPerBatch={}
                    numColumns={}
                    updateCellsBatchingPeriod={}
                    windowSize={}*/
                />
            </View>
        );
    }
}


class MyListItem extends React.PureComponent {

    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const textColor = this.props.selected ? "red" : "black";
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View>
                    <Text style={{ color: textColor }}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
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
    },
    item: {
        flex:1,
        flexDirection:'row',
        padding:10,
        backgroundColor:'#fff',
    },
});
