'use strict';
import React, {Component} from 'react';

class NetUtil extends Component {

    static DouB_Api = 'https://api.douban.com/v2/movie/top250?start=0&count=20';

    /**
     * get请求
     *url : 请求地址
     *callback : 回调函数
     */
    static get(url, callback) {
        var fetchOptions = {
            method: 'GET',
            headers: {
                'X-LC-Id': 'M401fErHUKmgp0wjqVRX-gzGzoHsz',
                'X-LC-Key': 'Jqnvt1LvQh1JDRUpRAqq'
            }
        };
        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                callback(JSON.parse(responseText));
            }).done();
    }

    /**
     * delete请求
     *url : 请求地址
     *callback : 回调函数
     */
    static delete(url, callback) {
        var fetchOptions = {
            method: 'DELETE',
            headers: {
                'X-LC-Id': 'M401fErHUKmgp0wjqVRX-gzGzoHsz',
                'X-LC-Key': 'Jqnvt1LvQh1JDRUpRAqq'
            }
        };
        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                callback(JSON.parse(responseText));
            }).done();
    }

    /**
     * post请求
     * url : 请求地址
     * data : 参数(Json对象)
     * callback : 回调函数
     * */
    static postJson(url, data, callback) {
        var fetchOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-LC-Id': 'M401fErHDKmgp0wjqVRX-gzGzoHsz',
                'X-LC-Key': 'Jqnvt34vQh1JDRUpRAqq'
            },
            body: JSON.stringify(data)
        };

        fetch(url, fetchOption)
            .then((response) => response.text())
            .then((responseText) => {
                callback(JSON.parse(responseText))
            })
            .done();
    }

    /**
     * put请求
     * url : 请求地址
     * data : 参数(Json对象)
     * callback : 回调函数
     * */
    static putJson(url, data, callback) {
        var fetchOption = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-LC-Id': 'M401fErHUPKmgp0wjqVRX-gzGzoHsz',
                'X-LC-Key': 'Jqnvt34vQh1JDRUpRAqq'
            },
            body: JSON.stringify(data)
        };

        fetch(url, fetchOption)
            .then((response) => response.text())
            .then((responseText) => {
                callback(JSON.parse(responseText))
            })
            .done();
    }
}

export default NetUtil