// pages/community/shareInfoDetail/shareInfoDetail.js

var networkUtil = require('../../../utils/networkUtil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    installation: [],
    pay_type: [],
    imageUrl: getApp().globalData.imageUrl,

    hideModal: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      },
      function (e) {

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
   * 提交评论
   */
  confirm: function () {
    this.setData({
      hideModal: true
    });
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
      hideModal: false
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

  }
})