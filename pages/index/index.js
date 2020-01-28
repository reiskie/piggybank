//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '余额',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    balance: 0,
    idxCategory: 'in',
    valAmt:'',
    msgText:''
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  selectApply: function (e) {
    let id = e.target.dataset.id
    this.setData({
      idxCategory: id,
    })
  },
  
  submitAmt: function(e){
    var val = parseInt(e.detail.value.inputAmt)
    this.setData({
      msgText: "",
      valAmt: ''
    })
    if (!isNaN(val)) {
      if (val <= 0) {
        ;
      }
      else if (val > 100000) { 
        this.setData({
          msgText: "单笔最大100,000!",
        })
      }
      else {
        if (this.data.idxCategory == "in") { val = val }
        else { val = -1 * val }

        this.setData({
          balance: this.data.balance + val,
        })

        // 记录明细，写入本地存储
        var amtLogs = wx.getStorageSync('amtLogs') || [];
        amtLogs.unshift([Date.now(), val, this.data.balance])
        //console.log(amtLogs)
        wx.setStorageSync('amtLogs', amtLogs)
      }
    }
  },

  onShow: function () {
    // 读取本地存储, 获取最后一条明细中的余额
    var amtLogs = wx.getStorageSync('amtLogs') || []
    var bal = (amtLogs.length > 0) ? amtLogs[0][2] : 0
    //console.log("lastest balance: " + bal)

    this.setData({
      balance: bal,
      msgText:""
    })

  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
