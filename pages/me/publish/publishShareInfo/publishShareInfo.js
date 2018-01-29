// pages/me/publish/publishShareInfo/publishShareInfo.js

var networkUtil = require('../../../../utils/networkUtil.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 房子图片
    housePic: '',
    housePicUrl: '',
    // 城市区域
    regionArray: [['贵阳市'], ['观山湖区', '南明区', '云岩区', '花溪区']],
    regionIndex: [0, 0],
    // 户型
    houseTypeArray: ['一室一厅一卫', '一室一卫一厨', '二室二厅一卫一厨', '三室两厅两卫一厨', '三室两厅一卫一厨'],
    houseTypeIndex: 0,
    // 到期时间
    deadline: '请选择',
    // 付款方式
    pay_type: [0, 0, 0],
    // 设施
    installation: [0, 0, 0, 0, 0, 0, 0, 0],
    // 联系人
    contact: '',
    // 性别
    gender: 1,
    // 租赁合同图片
    agreementPic: '',
    agreementPicUrl: '',
    // 房产证
    ownershipPic: '',
    ownershipPicUrl: '',
    // 地址
    address: '',
    // 租金
    rental: '',
    // 电话
    phone: ''
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
  chooseHousePic: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        // 上传图片
        wx.uploadFile({
          url: 'http://192.168.1.86:5000/uploadFileToServer',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var jsonDataStr = res.data
            var data = JSON.parse(jsonDataStr)
            console.log(data);
            // 显示图片
            if (data.success) {
              that.setData({
                housePic: tempFilePaths[0],
                housePicUrl: data.path
              });
            }
          }
        })

      }
    })
  },

  /**
   * 区域修改触发函数
   */
  bindRegionIndexChange: function (e) {
    this.setData({
      regionIndex: e.detail.value
    })
  },

  /**
   * 户型修改触发函数
   */
  bindHouseTypeIndexChange: function (e) {
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
  },

  /**
   * 点击付款方式复选按钮
   */
  clickPayType: function (e) {
    var index = e.currentTarget.dataset.id;
    var indexStr = 'pay_type[' + index + ']';
    if (this.data.pay_type[index] == 0) {
      this.setData({
        [indexStr]: 1
      });
    } else {
      this.setData({
        [indexStr]: 0
      });
    }
  },

  /**
   * 点击设施复选按钮
   */
  clickInstallation: function (e) {
    var index = e.currentTarget.dataset.id;
    var indexStr = 'installation[' + index + ']';
    if (this.data.installation[index] == 0) {
      this.setData({
        [indexStr]: 1
      });
    } else {
      this.setData({
        [indexStr]: 0
      });
    }
  },

  /**
   * 点击性别按钮
   */
  clickGender: function (e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      gender: id
    });
  },

  /**
   * 上传租赁合同图片按钮
   */
  chooseAgreementPic: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        // 上传图片
        wx.uploadFile({
          url: 'http://192.168.1.86:5000/uploadFileToServer',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var jsonDataStr = res.data
            var data = JSON.parse(jsonDataStr)
            console.log(data);
            // 显示图片
            if (data.success) {
              that.setData({
                agreementPic: tempFilePaths[0],
                agreementPicUrl: data.path
              });
            }
          }
        })
      }
    })
  },

  /**
   * 上传房产证图片按钮
   */
  chooseOwnershipPic: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        // 上传图片
        wx.uploadFile({
          url: 'http://192.168.1.86:5000/uploadFileToServer',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var jsonDataStr = res.data
            var data = JSON.parse(jsonDataStr)
            console.log(data);
            // 显示图片
            if (data.success) {
              that.setData({
                ownershipPic: tempFilePaths[0],
                ownershipPicUrl: data.path
              });
            }
          }
        })
      }
    })
  },

  /**
   * 地址输入框绑定函数
   */
  bindAddressInput: function (e) {
    this.setData({
      address: e.detail.value
    });
  },

  /**
   * 租金输入框绑定函数
   */
  bindRentalInput: function (e) {
    this.setData({
      rental: e.detail.value
    });
  },

  /**
   * 联系人输入框绑定函数
   */
  bindContactInput: function (e) {
    this.setData({
      contact: e.detail.value
    });
  },

  /**
   * 手机号输入框绑定函数
   */
  bindPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  /**
   * 提交按钮
   */
  submit: function (e) {
    var that = this;
    if (!app.globalData.openid)
      return

    // 付款方式
    var payType = that.data.pay_type[0]
    for (var i = 1; i < that.data.pay_type.length; i++) {
      payType += '_' + that.data.pay_type[i]
    }
    // 设施
    var installation = that.data.installation[0]
    for (var i = 1; i < that.data.installation.length; i++) {
      installation += '_' + that.data.installation[i]
    }

    var params = {
      'user_id': app.globalData.openid,
      'house_img': that.data.housePicUrl,
      'city': that.data.regionArray[0][that.data.regionIndex[0]],
      'region': that.data.regionArray[1][that.data.regionIndex[1]],
      'address': that.data.address,
      'house_type': that.data.houseTypeArray[that.data.houseTypeIndex],
      'rental': that.data.rental,
      'pay_type': payType,
      'installation': installation,
      'due_time': that.data.deadline,
      'contact': that.data.contact,
      'gender': that.data.gender,
      'phone': that.data.phone,
      'agreement': that.data.agreementPicUrl,
      'ownership': that.data.ownershipPicUrl
    }

    // 输入有效性检查
    if (params.house_img == '') {
      wx.showToast({
        title: '请上传公寓图片',
        icon: 'none'
      })
      return
    }
    if (params.address == '') {
      wx.showToast({
        title: '请填写具体地址',
        icon: 'none'
      })
      return
    }
    if (params.rental == '') {
      wx.showToast({
        title: '请填写租金',
        icon: 'none'
      })
      return
    }
    if (params.due_time == '请选择') {
      wx.showToast({
        title: '请选择房屋到期时间',
        icon: 'none'
      })
      return
    }
    if (params.contact == '') {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return
    }
    if (params.phone == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return
    }

    console.log(params)

    // 网络请求
    networkUtil._post1('http://192.168.1.86:5000/add_share_house', params,
      function (res) {
        if (res.data.success) {
          wx.navigateBack({
            delta: 1
          })
        }
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })

      },
      function (res) {

      })
  }
})