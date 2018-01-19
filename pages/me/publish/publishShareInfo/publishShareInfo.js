// pages/me/publish/publishShareInfo/publishShareInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    housePic:'',

    regionArray: [['贵阳市'], ['观山湖区', '南明区', '云岩区', '花溪区']],
    regionIndex: [0, 0],

    houseTypeArray: ['一室一厅一卫', '一室一卫一厨', '二室二厅一卫一厨', '三室两厅两卫一厨', '三室两厅一卫一厨'],
    houseTypeIndex: 0,

    deadline: '请选择'
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
   * 选择公寓图片
   */
  chooseHousePic: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        // 显示图片
        that.setData({
          housePic: 'http://oos.guipiaoke.com/image/guipiao_mini/avatar_bg.png'
        });
      }
    })
  },

  /**
   * 区域修改触发函数
   */
  bindRegionIndexChange: function(e) {
    this.setData({
      regionIndex: e.detail.value
    })
  },

  /**
   * 户型修改触发函数
   */
  bindHouseTypeIndexChange: function(e) {
    this.setData({
      houseTypeIndex: e.detail.value
    })
  },

  /**
   * 到期时间修改触发函数
   */
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      deadline: e.detail.value
    })
  }
})