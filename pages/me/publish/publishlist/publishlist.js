// pages/me/publish/publishlist/publishlist.js


var networkUtil = require('../../../../utils/networkUtil.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: app.globalData.imageUrl,
    baseUrl: 'http://192.168.1.86:5000/get_share_house_list/',
    hasMoreData: true, // 是否有更多数据的标志
    loadMoreText: false, // 用来显示列表下方的加载更多的提示语

    list: [], // 列表数据
    page: 1 // 当前页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refreshData();
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
    this.refreshData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;

    if (!that.data.hasMoreData)
      return;
    that.setData({
      loadMoreText: true
    });

    if (!app.globalData.openid)
      return;

    var url = that.data.baseUrl + (++that.data.page) + '/' + app.globalData.openid;
    networkUtil._get(url,
      function (res) {
        if (res.data == null || res.data.length == 0) {
          that.setData({
            hasMoreData: false,
            loadMoreText: false
          });
        } else {
          that.setData({
            list: that.data.list.concat(res.data),
            hasMoreData: true,
            loadMoreText: false
          });
        }
      },
      function (res) {

      }
    );
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 跳转到发布页面（发布分享房源信息）
   */
  goPublish: function (e) {
    wx.navigateTo({
      url: '../publishShareInfo/publishShareInfo',
    })
  },

  /**
   * 跳转到详情
   */
  goDetail: function (e) {
    wx.navigateTo({
      url: '../../../community/shareInfoDetail/shareInfoDetail?id=' + e.currentTarget.id,
    })
  },

  /**
   * refreshData
   */
  refreshData: function (e) {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;

    if (!app.globalData.openid)
      return;

    var url = that.data.baseUrl + 1 + '/' + app.globalData.openid;
    networkUtil._get(url,
      function (res) {
        that.setData({
          list: res.data,
          page: 1,
          hasMoreData: true,
          loadMoreText: false
        });
        console.log(res.data);
        wx.hideLoading();
        wx.stopPullDownRefresh();
      },
      function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    );
  },

  /**
   * 删除
   */
  delete: function (e) {
    var id = e.currentTarget.dataset.id
    if (!app.globalData.openid)
      return

    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success: function (res) {
        if (res.confirm) {
          // 网络操作
          wx.showLoading({
            title: '加载中',
          })
          networkUtil._post1('http://192.168.1.86:5000/delete_share_house',
            { 'id': id },
            function (e) {
              wx.hideLoading()
              wx.showToast({
                title: e.data.msg,
                icon: 'none'
              })
              if (e.data.success) {
                wx.redirectTo({
                  url: 'publishlist',
                })
              }
            },
            function (e) {
              wx.hideLoading()
            })

        } else if (res.cancel) {
        }
      }
    })


  }
})