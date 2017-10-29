// pages/mainpage/mainpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: ['http://img5.imgtn.bdimg.com/it/u=2937096958,2678507117&fm=27&gp=0.jpg',
      'http://img0.imgtn.bdimg.com/it/u=1502841830,297430462&fm=27&gp=0.jpg'],
    recommentList: ['http://img1.imgtn.bdimg.com/it/u=521695002,777815227&fm=27&gp=0.jpg',
      'http://img4.imgtn.bdimg.com/it/u=3226882641,4141947605&fm=27&gp=0.jpg',
      'http://img3.imgtn.bdimg.com/it/u=945732452,4268138441&fm=27&gp=0.jpg',
      'http://img2.imgtn.bdimg.com/it/u=389035844,2248915236&fm=27&gp=0.jpg']
  },

  /**
   * 查看更多
   */
  viewMore: function() {
    wx.switchTab({
      url: '../../pages/houselist/houselist',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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