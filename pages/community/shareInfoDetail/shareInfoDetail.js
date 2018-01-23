// pages/community/shareInfoDetail/shareInfoDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    installation: [['沙发', '床', '茶几', '衣柜', '洗衣机'], ['冰箱', '宽带', '电视']],
    pay_type: ['月付', '季付', '年付'],

    hideModal: true
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
  
  },

  /**
   * 提交评论
   */
  confirm: function() {
    this.setData({
      hideModal: true
    });
  },

  /**
   * 取消评论
   */
  cancel: function() {
    this.setData({
      hideModal: true
    });
  },

  /**
   * 点击评论按钮
   */
  goComment: function() {
    this.setData({
      hideModal: false
    });
  }
})