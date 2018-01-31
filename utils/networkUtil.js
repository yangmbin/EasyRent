import util from 'util.js';

var server = 'https://guipiaoke.com'
// var server = 'http://192.168.1.86:5000'

/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _get(url, success, fail) {

  console.log("----_get----start----");
  wx.request({
    url: url.indexOf('/') == 0 ? server + url : url,
    header: {
      // 'Content-Type': 'application/json'
    },
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });

  console.log("----_get----end----");
}

/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _post(url, data, success, fail) {
  console.log("----_post----start----");
  wx.request({
    url: url.indexOf('/') == 0 ? server + url : url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: { data: data },
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
  console.log("----_post----end----");
}


/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _post1(url, data, success, fail) {
  console.log("----_post1----start----");
  wx.request({
    url: url.indexOf('/') == 0 ? server + url : url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: data,
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
  console.log("----_post1----end----");
}





/**
* url 请求地址
* success 成功的回调
* fail 失败的回调
*/
function _post_json(url, data, success, fail) {
  console.log("----_post_json----start----");
  wx.request({
    url: url.indexOf('/') == 0 ? server + url : url,
    // header: {
    //     'content-type': 'application/json',
    // },
    method: 'POST',
    data: data,
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });

  console.log("----_post_json----end----");
}
module.exports = {
  _get: _get,
  _post: _post,
  _post1: _post1,
  _post_json: _post_json
}