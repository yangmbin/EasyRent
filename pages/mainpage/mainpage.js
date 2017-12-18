// pages/mainpage/mainpage.js
var networkUtil = require('../../utils/networkUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: getApp().globalData.imageUrl,
    // bannerUrl: 'http://localhost:5000/get_banner_house_list',
    // recommendUrl: 'http://localhost:5000/get_recommend_house_list',
    bannerUrl: 'https://guipiaoke.com/get_banner_house_list',
    recommendUrl: 'https://guipiaoke.com/get_recommend_house_list',
    bannerList: [],
    recommendList: []
  },

  /**
   * 查看更多
   */
  viewMore: function () {
    wx.switchTab({
      url: '../../pages/houselist/houselist',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    // 参数
    var params = {};
    // 请求banner公寓
    networkUtil._get(that.data.bannerUrl,
      function (res) {
        // 获取第一个图片，分割字符串
        var result = res.data;
        for (var i = 0; i < result.length; i++) {
          result[i].firstImage = result[i].images.split(",")[0];
        }
        that.setData({
          bannerList: res.data
        });

        // 请求推荐公寓
        networkUtil._get(that.data.recommendUrl,
          function (res) {
            // 获取第一个图片，分割字符串
            var result = res.data;
            for (var i = 0; i < result.length; i++) {
              result[i].firstImage = result[i].images.split(",")[0];
            }
            that.setData({
              recommendList: res.data
            });
            wx.hideLoading();
          }),
          function (res) {
            wx.hideLoading();
          }
          // end
      }),
      function (res) {
        wx.hideLoading();
      }
  },

  /**
   * 点击banner图
   */
  clickBanner: function(e) {
    console.log(e.currentTarget.id);
    var index = e.currentTarget.id;
    var detail = JSON.stringify(this.data.bannerList[index]);
    wx.navigateTo({
      url: '../housedetail/housedetail?detail=' + detail
    })
  },


  /**
   * 点击推荐图
   */
  clickRecommend: function(e) {
    console.log(e.currentTarget.id);
    var index = e.currentTarget.id;
    var detail = JSON.stringify(this.data.recommendList[index]);
    wx.navigateTo({
      url: '../housedetail/housedetail?detail=' + detail
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

  }
})