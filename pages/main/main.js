// pages/main/main.js

var networkUtil = require('../../utils/networkUtil.js');
var jsonUtil = require('../../utils/jsonUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // baseUrl: 'http://gank.io/api/data/Android/',
    // baseUrl: 'http://gank.io/api/data/福利/',
    // baseUrl: 'http://28075cb3.nat123.cc/get_house_info/',
    baseUrl: 'https://guipiaoke.com/get_house_info/',
    // baseUrl: 'http://localhost:5000/get_house_info/',
    list: [],
    page: 1,
    size: 10,
    hasMoreData: true, // 是否有更多数据的标志
    loadMoreText: false, // 用来显示列表下方的加载更多的提示语
    loadMoreComplete: false, // 用来表示加载完毕的提示语,
    imageUrl: getApp().globalData.imageUrl,
    menuPosition: 'static', // 菜单筛选是否固定或跟随页面滑动判断

    // tab列表项
    cityList: ["贵阳"],
    regionList: ["全部", "观山湖区", "南明区", "云岩区", "花溪区"],
    priceList: ["不限", "1000以下", "1000-1500", "1500-2000", "2000-2500", "2500以上"],
    // 控制tab项的隐藏
    tab: [true, true, true],
    // 当前选择的筛选项
    currentCityIndex: 0,
    currentRegionIndex: 0,
    currentPriceIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    var url = that.data.baseUrl + that.data.size + '/1'; // 10条，第一页
    // 参数
    var params = {
      'cityIndex':this.data.currentCityIndex,
      'regionIndex':this.data.currentRegionIndex,
      'priceIndex':this.data.currentPriceIndex
    };
    networkUtil._post1(url, params,
      function (res) {
        // 获取第一个图片，分割字符串
        var result = res.data;
        for (var i = 0; i < result.length; i++) {
          result[i].firstImage = result[i].images.split(",")[0];
        }
        that.setData({
          list: res.data,
          page: 1,
          hasMoreData: res.data.length == 10 ? true : false,
          loadMoreText: res.data.length == 10 ? true : false,
          loadMoreComplete: res.data.length == 10 ? false : true
        });
        console.log(res);
        wx.hideLoading();
      }),
      function (res) {
        console.log(res);
        wx.hideLoading();
      }
  },

  // 公寓列表项点击事件
  bindViewTap: function (e) {
    console.log(e.currentTarget.dataset.title);
    console.log(e.currentTarget.id);
    var index = e.currentTarget.id;
    var detail = JSON.stringify(this.data.list[index]);
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
    var that = this;
    var url = that.data.baseUrl + that.data.size + '/1';
    // 参数
    var params = {
      'cityIndex': this.data.currentCityIndex,
      'regionIndex': this.data.currentRegionIndex,
      'priceIndex': this.data.currentPriceIndex
    };
    networkUtil._post1(url, params,
      function (res) {
        // 获取第一个图片，分割字符串
        var result = res.data;
        for (var i = 0; i < result.length; i++) {
          result[i].firstImage = result[i].images.split(",")[0];
        }
        that.setData({
          list: res.data,
          page: 1,
          hasMoreData: res.data.length == 10 ? true : false,
          loadMoreText: res.data.length == 10 ? true : false,
          loadMoreComplete: res.data.length == 10 ? false : true
        });
        console.log(res);
        wx.stopPullDownRefresh();
      },
      function (res) {
        console.log(res);
        wx.stopPullDownRefresh();
      });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var url = that.data.baseUrl + that.data.size + '/' + (++that.data.page);
    if (!this.data.hasMoreData)
      return;
    that.setData({
      loadMoreText: true
    });
    // 参数
    var params = {
      'cityIndex': this.data.currentCityIndex,
      'regionIndex': this.data.currentRegionIndex,
      'priceIndex': this.data.currentPriceIndex
    };
    networkUtil._post1(url, params,
      function (res) {
        if (res.data == null || res.data.length == 0) {
          that.setData({
            hasMoreData: false,
            loadMoreText: false,
            loadMoreComplete: true
          });
        } else {
          // 获取第一个图片，分割字符串
          var result = res.data;
          for (var i = 0; i < result.length; i++) {
            result[i].firstImage = result[i].images.split(",")[0];
          }
          that.setData({
            list: that.data.list.concat(res.data),
            hasMoreData: true,
            loadMoreText: true,
            loadMoreComplete: false
          });
        }
      },
      function (res) {
        console.log(res);
      });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 监听页面滚动，动态设置页面是否是固定的
   */
  onPageScroll: function (res) {
    // Do something when page scroll
    console.log(res);
    if (res.scrollTop <= 0) {
      this.setData({
        menuPosition: 'static'
      });
    } else {
      if (this.menuPosition != 'fixed') {
        this.setData({
          menuPosition: 'fixed'
        });
      }
    }
  },

  /**
   * 点击Tab
   */
  clickTab: function (e) {
    var tabId = e.currentTarget.id;
    console.log(tabId);
    switch (tabId) {
      case "1":
        // 重复点击，则收起
        if (!this.data.tab[0]) {
          this.setData({
            tab: [true, true, true]
          });
        } else {
          this.setData({
            tab: [false, true, true]
          });
        }
        break;
      case "2":
        // 重复点击，则收起
        if (!this.data.tab[1]) {
          this.setData({
            tab: [true, true, true]
          });
        } else {
          this.setData({
            tab: [true, false, true]
          });
        }
        break;
      case "3":
        // 重复点击，则收起
        if (!this.data.tab[2]) {
          this.setData({
            tab: [true, true, true]
          });
        } else {
          this.setData({
            tab: [true, true, false]
          });
        }
        break;
    }
  },

  /**
   * 点击Tab的item
   */
  clickCityItem:function(e) {
    this.setData({
      currentCityIndex:e.currentTarget.id,
      tab: [true, true, true]
    });
    // 重新获取数据
    this.getHomeData();
  },
  clickRegionItem: function (e) {
    this.setData({
      currentRegionIndex: e.currentTarget.id,
      tab: [true, true, true]
    });
    // 重新获取数据
    this.getHomeData();
  },
  clickPriceItem: function (e) {
    this.setData({
      currentPriceIndex: e.currentTarget.id,
      tab: [true, true, true]
    });
    // 重新获取数据
    this.getHomeData();
  },

  /**
   * 获取首页数据，第一次或下拉刷新
   */
  getHomeData:function() {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    var url = that.data.baseUrl + that.data.size + '/1'; // 10条，第一页
    // 参数
    var params = {
      'cityIndex': this.data.currentCityIndex,
      'regionIndex': this.data.currentRegionIndex,
      'priceIndex': this.data.currentPriceIndex
    };
    networkUtil._post1(url, params,
      function (res) {
        // 获取第一个图片，分割字符串
        var result = res.data;
        for (var i = 0; i < result.length; i++) {
          result[i].firstImage = result[i].images.split(",")[0];
        }
        that.setData({
          list: res.data,
          page: 1,
          hasMoreData: res.data.length == 10 ? true : false,
          loadMoreText: res.data.length == 10 ? true : false,
          loadMoreComplete: res.data.length == 10 ? false : true
        });
        console.log(res);
        wx.hideLoading();
      }),
      function (res) {
        console.log(res);
        wx.hideLoading();
      }
  }

})