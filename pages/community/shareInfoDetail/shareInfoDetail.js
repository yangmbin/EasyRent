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

    hideModal: true,
    modal_title: '',
    comment_input: '',
    // 被回复人的nickname（回复）
    reply_user_nickname: '',
    // 被回复的人id（回复）
    reply_user_id: '',
    // 被回复的主评论id（回复）
    share_house_comment_id: ''
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
    networkUtil._get('http://127.0.0.1:5000/get_share_house_detail/' + id,
      function (e) {
        console.log(e)
        that.setData({
          detail: e.data
        })

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
   * 取消评论
   */
  cancel: function () {
    this.setData({
      hideModal: true
    });
  },

  /**
   * 点击评论按钮
   */
  goComment: function () {
    this.setData({
      hideModal: false,
      modal_title: '留言'
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
      hideModal: false,
      modal_title: '回复 ' + _reply_user_nickname,
      reply_user_nickname: _reply_user_nickname,
      reply_user_id: _reply_user_id,
      share_house_comment_id: _share_house_comment_id
    });
  },

  /**
   * 绑定评论输入框函数
   */
  bindCommentInput: function (e) {
    this.setData({
      comment_input: e.detail.value
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
    if (that.data.comment_input == '') {
      wx.showToast({
        title: '请输入评论内容',
      })
      return
    }

    // 评论或回复
    var url = ''
    var params = {}
    if (that.data.modal_title == '留言') {
      url = 'http://127.0.0.1:5000/share_house_comment'
      params = {
        'user_id': app.globalData.openid,
        'share_house_id': that.data.detail.id,
        'content': that.data.comment_input
      }
    } else {
      url = 'http://127.0.0.1:5000/share_house_reply'
      params = {
        'user_id': app.globalData.openid,
        'reply_user_id': that.data.reply_user_id,
        'share_house_comment_id': that.data.share_house_comment_id,
        'content': that.data.comment_input
      }
    }
    networkUtil._post1(url, params,
      function (e) {
        wx.hideLoading()
        wx.showToast({
          title: e.data.msg,
        })
        // 评论成功，刷新当前页面
        if (e.data.success) {
          that.setData({
            hideModal: true
          });
          
          wx.redirectTo({
            url: 'shareInfoDetail?id=' + that.data.detail.id,
          })
        }
      },
      function (e) {
        wx.hideLoading()
      })

  }
})