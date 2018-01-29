//app.js

var networkUtil = require('utils/networkUtil.js');
App({
  onLaunch: function () {

    var that = this;

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 初始化登录
    that.initLogin();

  },

  /**
   * 登录初始化（获取code等）
   */
  initLogin: function(e) {
    var that = this;

    // 登录获取登录凭证（code），然后向后台获取openid，保存在本地
    wx.login({
      success: res1 => {

        that.globalData.code = res1.code;
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(res1)
        }

        // 获取用户信息
        wx.getSetting({
          success: res2 => {
            if (res2.authSetting['scope.userInfo']) {
              that.login();
            } else {
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  that.login();
                },
                fail() {
                  that.showAuthModal();
                }
              })
            }
          }
        });


      }
    });
  },

  /**
   * 向后台登录
   */
  login: function (e) {
    var that = this;
    wx.getUserInfo({
      success: res1 => {
        that.globalData.userInfo = res1.userInfo

        // 向后台登录
        var params = {
          'js_code': that.globalData.code,
          'nickname': that.globalData.userInfo.nickName,
          'avatar': that.globalData.userInfo.avatarUrl
        };
        networkUtil._post1('http://192.168.1.86:5000/mini_login', params,
          function (res2) {
            console.log(res2);
            // 保存openid
            if (res2.data.success) {
              that.globalData.openid = res2.data.openid;
            }
          },
          function (res2) {

          });

      }
    });
  },

  /**
   * 拒绝授权就不弹框了，弹另一个设置页面，如果还拒绝，一直弹这个页面
   */
  showAuthModal: function(e) {
    var that = this;
    wx.openSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo'])
          that.login();
        else
          that.showAuthModal();
      }
    })
  },

  globalData: {
    userInfo: null, // 用户信息
    imageUrl: "http://oos.guipiaoke.com/",
    code: '', // 登录凭证
    openid: '' // 用户唯一标识符
  }
})