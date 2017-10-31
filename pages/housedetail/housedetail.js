// pages/housedetail/housedetail.js
var networkUtil = require('../../utils/networkUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null,
    images: [],
    imageUrl: getApp().globalData.imageUrl,
    installation_item_list: [],
    longimage: '', // 长图
    lat: null, // 纬度
    lng: null, // 经度
    // baseUrl: 'https://guipiaoke.com/get_contact',
    baseUrl: 'http://localhost:5000/get_contact',
    phone:null // 联系电话
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });

    console.log(options.detail);
    var _detail = JSON.parse(options.detail);
    var _imagesTmp = _detail.images.split(",");
    var _images = [];
    for (var i = 0; i < _imagesTmp.length; i++) {
      if (_imagesTmp[i] != "")
        _images.push(_imagesTmp[i]);
    }
    this.setData({
      detail: _detail,
      images: _images,
      longimage: _detail.longimage,
      lat: _detail.lat,
      lng: _detail.lng
    });

    console.log(this.data.images);
    console.log(this.data.longimage);

    // 设施显示，先把数据处理一下，5个一组，按表格显示
    var _installation_text_list = [];
    if (_detail.installation_wifi == 1)
      _installation_text_list.push("无线");
    if (_detail.installation_kitchen == 1)
      _installation_text_list.push("厨房");
    if (_detail.installation_hoods == 1)
      _installation_text_list.push("油烟机");
    if (_detail.installation_water_heater == 1)
      _installation_text_list.push("热水器");
    if (_detail.installation_washer == 1)
      _installation_text_list.push("洗衣机");
    if (_detail.installation_toilet == 1)
      _installation_text_list.push("卫生间");
    console.log(_installation_text_list)
    var size = _installation_text_list.length;
    var _installation_item_list = [];
    for (var i = 0; i < size % 5 + 1; i++) {
      var obj = new Object();
      obj.item0 = _installation_text_list[i * 5 + 0];
      obj.item1 = _installation_text_list[i * 5 + 1];
      obj.item2 = _installation_text_list[i * 5 + 2];
      obj.item3 = _installation_text_list[i * 5 + 3];
      obj.item4 = _installation_text_list[i * 5 + 4];
      _installation_item_list[i] = obj;
    }
    console.log(_installation_item_list);
    this.setData({
      installation_item_list: _installation_item_list
    });

    // 网络请求获取电话
    var that = this;
    networkUtil._get(this.data.baseUrl,
      function (res) {
        console.log(res.data.phone)
        that.setData({
          phone: res.data.phone
        });
      },
      function (res) {

      });
  },

  /**
   * 拨打电话
   */
  dial: function () {
    if (!this.data.phone)
      return;
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  /**
   * 打开微信内置地图
   */
  openMap: function () {
    // wx.getLocation({
    //   type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
    //   success: function (res) {
    //     // success
    //     wx.openLocation({
    //       latitude: res.latitude, // 纬度，范围为-90~90，负数表示南纬
    //       longitude: res.longitude, // 经度，范围为-180~180，负数表示西经
    //       scale: 28, // 缩放比例         
    //     })
    //   }
    // })

    wx.openLocation({
      latitude: this.data.lat, // 纬度，范围为-90~90，负数表示南纬
      longitude: this.data.lng, // 经度，范围为-180~180，负数表示西经
      scale: 28, // 缩放比例         
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
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