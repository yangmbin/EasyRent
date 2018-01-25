// pages/community/community.js

var networkUtil = require('../../utils/networkUtil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: getApp().globalData.imageUrl,
    baseUrl: 'http://127.0.0.1:5000/get_share_house_list/', 
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
    var url = that.data.baseUrl + (++that.data.page);
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
   * 跳转到详情页面
   */
  goDetail: function (e) {
    wx.navigateTo({
      url: 'shareInfoDetail/shareInfoDetail?id=' + e.currentTarget.id,
    })
  },

  /**
   * refreshData
   */
  refreshData: function(e) {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    var url = that.data.baseUrl + 1;
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
  }
})