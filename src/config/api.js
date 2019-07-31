/**
 * Created by yuchuang on 2017/6/22.
 */
// 配置API接口地址
import {baseUrl} from './env'
//验签
import md5 from '../plugins/sign/md5'
// import DES from '../plugins/sign/3DES'
import Base64 from '../plugins/sign/base64'

// 引用axios
var axios = require('axios')
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
function sign(body) {
  let base = new Base64();
  let sign =md5.hex_md5(base.encode(JSON.stringify(body)));
  return sign;
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/*
 接口处理函数
 这个函数每个项目都是不一样的，我现在调整的是适用于
 https://cnodejs.org/api/v1 的接口，如果是其他接口
 需要根据接口的参数进行调整。参考说明文档地址：
 https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
 主要是，不同的接口的成功标识和失败提示是不一致的。
 另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
 */

function apiAxios (method, url, params, success, failure) {

  axios({
    method: method,
    url:url,
    // headers:{'sign':sign(params)},
    data: method === 'POST' || method === 'PUT' ? JSON.stringify(params) : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    // baseURL: baseUrl,
    // withCredentials: false,
    headers: {
      // 'sign':sign(params),
      // 'Authorization':'bearer jbQDCjfCD0b-RXmt0vzmEJi7M9P8bXk8UjllglJcTSdDFf_f5MPnKGiFD8RRXUmbRhN-qAahicC3iITbBP5xtuD1r-oy0aIlCMT0NBwr-FzYLVSsov18yE20DfnTE6mc0nCXZ-607KQBINu7t1aSdTLhe0AB8MzA9quxwtUzJGytsPDCaY_Rb6VE97zB77NNYwGGmCBFry0wD6ZY123JBPWrCNWmw5eZcDBPrGC2dNRvquz2URljKvWDksSL1VraLEexxtr97it_7k_SiPkqqhtmh8-0cTuodymk64K3VE3wSUBoKf7ZB3Oh_5blXmMjXfEWCuqbHbunzr9yY9cb2hY0lOKRJFnZ7R4srKFD1yGw3Z7edkofTtt_6fmbt4vhej2EiLSJRK_Y423votQair6LjGKGisXNd8JFCGfWCNRC4EJ1wynkq_kOUbs5Q5OHOx0MP0yDbEC0SKw1-GJeDqxNqq4ZxiFerbknC3YMIc5JT4BUHIljtAgmeuVh_X-T',
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then(function (res) {
      // console.log(res)
      // 成功返回数据
      if(res.data.code==200 && success){
        success(res.data.data)
      }

      if(res.data.code==201){
        alert(res.data.msg)
      }

      // 用户不存在
      if(res.data.code==202){
        localStorage.clear();
        alert(res.data.msg)
      }
      // 根据返回的编码  操作对应的提示
      // if (res.data.head.rtnCode == "00000") {
      //   if (success) {
      //     success(res.data)
      //   }
      // } else {
      //   localStorage.clear();
      //   window.alert(res.data.head.rtnMsg)
      // }
    })
    .catch(function (err) {
      console.log(err)
    })
  // axios.defaults.headers.common['sign'] = sign(params);
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url,params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}
