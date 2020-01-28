//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    amtLogs: [],
    amtLogsTable:[]
  },

  tapClearAll: function () {
    wx.setStorageSync('amtLogs', [])
    /*
    this.setData({
      amtLogs: []
    })*/
    this.setData({
      amtLogsTable: []
    })
  },

  // 清零余额，此动作本身也记录一条明细
  tapClearBal: function () {
    var amtLogs = wx.getStorageSync('amtLogs') || [];
    var bal = (amtLogs.length > 0) ? amtLogs[0][2] : 0

    if (bal <= 0){ return}

    amtLogs.unshift([Date.now(), "清零", 0])
    //console.log(amtLogs)
    wx.setStorageSync('amtLogs', amtLogs)
    /*
    this.setData({
      amtLogs: (wx.getStorageSync('amtLogs') || []).map(amtLog => {
        return util.formatTime(new Date(amtLog[0])) + " 变动: " + amtLog[1] + " 余额: " + amtLog[2]
      })
    })  */
    this.setData({
      amtLogsTable: (wx.getStorageSync('amtLogs') || []).map(amtLog => {
        return { date: util.formatTime1(new Date(amtLog[0])), type: "压岁钱", val: amtLog[1], bal: amtLog[2] }
      })
    })        
  },

  onShow: function () {
    /*
    this.setData({
      amtLogs: (wx.getStorageSync('amtLogs') || []).map(amtLog => {
        return util.formatTime(new Date(amtLog[0])) + " 变动: " + amtLog[1] + " 余额: " + amtLog[2]
      })
    })
    */
    this.setData({
      amtLogsTable: (wx.getStorageSync('amtLogs') || []).map(amtLog => {
        return {date:util.formatTime1(new Date(amtLog[0])), type:"压岁钱", val:amtLog[1], bal:amtLog[2]}
      })
    })
  },

  onLoad: function () { 

  },

})


