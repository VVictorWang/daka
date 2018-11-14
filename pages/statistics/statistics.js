// pages/statistics/statistics.js
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progress: 0,
    dakaDay: 0,
    totalDay: 30,
    dateStr: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dateStr = util.formatDate(new Date());
    this.setData({
      dateStr: dateStr
    });
    
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
    var date = new Date();
    date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days_count = date.getDate();
    this.setData({
      totalDay: days_count
    });
    var currentMonth = date.getMonth() + 1;
    var dakaInfo = wx.getStorageSync('dakaInfo');
    if (dakaInfo && dakaInfo != [] && dakaInfo != "") {
      var dakaDays = 0;
      for (var i = 0, len = dakaInfo.length; i < len; i++) {
        var item = dakaInfo[i];
        var dateTime = new Date(item['dakaTime']);
        if (dateTime.getMonth() === currentMonth) {
          var day = item['dakaDay'];
          dakaDays += parseFloat(day);
        }
      }
      var progress = dakaDays / days_count;
      this.setData({
        dakaDay: dakaDays,
        progress: progress
      });
    }

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