// pages/community/shareInfoDetail/shareInfoDetail.js

var networkUtil = require('../../../utils/networkUtil.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    installation: [],
    pay_type: [],
    imageUrl: getApp().globalData.imageUrl,

    input_hint: '',
    input_focus: false,
    // 被回复人的nickname（回复）
    reply_user_nickname: '',
    // 被回复的人id（回复）
    reply_user_id: '',
    // 被回复的主评论id（回复）
    share_house_comment_id: '',

    // 发送模板消息给这个人（openid）
    touser: '',
    // 模板消息id
    template_id: '',
    // form-id
    form_id: '',
    // 评论内容（用于模板消息）
    comment_input: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    console.log(options.id)
    var id = options.id
    networkUtil._get('/get_share_house_detail/' + id + '/' + app.globalData.openid,
      function (e) {
        console.log(e)
        that.setData({
          detail: e.data
        })
        console.log(e.data)

        // 房屋设施
        var installationList = e.data.installation.split('_')
        var installationRes = []
        var installationText = ['沙发', '床', '茶几', '衣柜', '洗衣机', '冰箱', '宽带', '电视']
        for (var i = 0; i < installationList.length; i++) {
          if (installationList[i] == '1')
            installationRes.push(installationText[i])
        }
        if (installationRes.length <= 5) {
          var tmp1 = []
          tmp1.push(installationRes)
          that.setData({
            installation: tmp1
          })
        }
        else {
          var tmp2 = []
          tmp2.push(installationRes.slice(0, 5))
          tmp2.push(installationRes.slice(5))
          that.setData({
            installation: tmp2
          })
        }


        // 付款方式
        var payTypeList = e.data.pay_type.split('_')
        var payTypeText = ['月付', '季付', '年付']
        var payTypeRes = []
        for (var i = 0; i < payTypeList.length; i++) {
          if (payTypeList[i] == '1')
            payTypeRes.push(payTypeText[i])
        }
        that.setData({
          pay_type: payTypeRes
        })

        wx.hideLoading()
      },
      function (e) {
        wx.hideLoading()
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击评论按钮
   */
  goComment: function () {
    this.setData({
      input_hint: '留言',
      input_focus: true
    });
  },

  /**
   * 拨打电话
   */
  dial: function () {
    var that = this;
    if (!that.data.detail.phone)
      return;

    wx.showModal({
      title: '联系电话',
      content: that.data.detail.phone,
      confirmText: '拨号',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          wx.makePhoneCall({
            phoneNumber: that.data.detail.phone,
            success: function () {
              console.log("拨打电话成功！")
            },
            fail: function () {
              console.log("拨打电话失败！")
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  /**
   * 点击评论进行回复（可以点击 评论 或 回复）
   */
  goReply: function (e) {
    // 被回复人的nickname
    var _reply_user_nickname = e.currentTarget.dataset.reply_user_nickname
    // 被回复的人id
    var _reply_user_id = e.currentTarget.dataset.reply_user_id
    // 被回复的主评论id
    var _share_house_comment_id = e.currentTarget.dataset.share_house_comment_id

    this.setData({
      input_hint: '回复 ' + _reply_user_nickname,
      input_focus: true,
      reply_user_nickname: _reply_user_nickname,
      reply_user_id: _reply_user_id,
      share_house_comment_id: _share_house_comment_id
    });
  },


  /**
   * 评论输入框聚焦
   */
  bindfocus: function (e) {
    console.log(e.detail.value)
    this.setData({
      input_focus: true
    })
  },

  /**
   * 评论输入框失去焦点
   */
  bindblur: function (e) {
    console.log(e.detail.value)
    this.setData({
      input_focus: false
    })
  },

  /**
   * 提交评论或回复
   */
  submit_comment: function (e) {
    if (!app.globalData.openid)
      return

    wx.showLoading({
      title: '加载中',
    })

    var that = this;
    var comment_input = e.detail.value.comment_input
    if (comment_input == '') {
      wx.showToast({
        title: '请输入评论内容',
      })
      return
    }

    // 评论或回复
    var url = ''
    var params = {}
    if (that.data.input_hint == '留言') {
      url = '/share_house_comment'
      params = {
        'user_id': app.globalData.openid,
        'share_house_id': that.data.detail.id,
        'content': comment_input,
      }

      that.setData({
        touser: that.data.detail.user_id,
        template_id: '4JR6Q5dffsiSbmZaYSy7uuVcA-M_xYApPYJAgcNCV_8',
        form_id: e.detail.formId,
        comment_input: comment_input
      })
    } else {
      url = '/share_house_reply'
      params = {
        'user_id': app.globalData.openid,
        'reply_user_id': that.data.reply_user_id,
        'share_house_comment_id': that.data.share_house_comment_id,
        'content': comment_input
      }

      that.setData({
        touser: that.data.reply_user_id,
        template_id: '4JR6Q5dffsiSbmZaYSy7urAmWlF5DALPV4YEWj6R8lY',
        form_id: e.detail.formId,
        comment_input: comment_input
      })
    }
    networkUtil._post1(url, params,
      function (e) {
        wx.hideLoading()
        wx.showToast({
          title: e.data.msg,
          icon: 'none'
        })
        // 评论成功，刷新当前页面
        if (e.data.success) {
          // 发送模板消息
          that.sendTemplateMsg()

          that.setData({
            input_focus: false
          });

          wx.redirectTo({
            url: 'shareInfoDetail?id=' + that.data.detail.id,
          })
        }
      },
      function (e) {
        wx.hideLoading()
      })

  },

  /**
   * 评论或回复成功后，发送模板消息（评论成功发送给发布信息的人，回复的成功发送给被回复的人）
   */
  sendTemplateMsg: function (e) {
    var that = this
    var get_access_token_url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx4dab771ae44ce9b2&secret=1eab4ec4f8b87935ea3080bb638ec9d0'
    networkUtil._get(get_access_token_url,
      function (e) {
        console.log(e);
        var token = e.data.access_token
        var send_url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + token
        var params = {
          'touser': that.data.touser,
          'template_id': that.data.template_id,
          'page': 'pages/community/shareInfoDetail/shareInfoDetail?id=' + that.data.detail.id,
          'form_id': that.data.form_id,
          'data': {}
        }
        params.data.keyword1 = {
          'value': app.globalData.userInfo.nickName,
          'color': '#173177'
        }
        params.data.keyword2 = {
          'value': that.data.comment_input,
          'color': '#173177'
        }

        console.log(params)
        networkUtil._post_json(send_url, params,
          function (e) {
            console.log(e)
            console.log('模板消息发送成功')
          })
      })
  },

  /**
   * 添加或取消收藏
   */
  goLikeOrDislike: function (e) {
    var that = this;
    var like = that.data.detail.like
    var url = '';
    if (like == 0)
      url = '/share_house_like'
    else
      url = '/share_house_dislike'

    var params = {
      'user_id': app.globalData.openid,
      'house_id': that.data.detail.id
    }
    networkUtil._post1(url, params,
      function (e) {
        wx.showToast({
          title: e.data.msg,
          icon: 'none'
        })

        that.setData({
          ['detail.like']: e.data.like 
        })
      })
  }
})