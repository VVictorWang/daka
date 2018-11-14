//index.js
//获取应用实例
const app = getApp()

const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()],  // 月份字符串
    calendar_days_style: [],
    dakaChoice: ['0.5','1'],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    let calendar_days_style = getDaysColor(new Date(this.data.year, this.data.month, 0),this.data.month,this.data.day);
    this.setData({
      calendar_days_style: calendar_days_style
    });
  },

  onDakaClicked: function(e){
    var dakaChoice = this.data.dakaChoice;
    var selectedDate = new Date(this.data.year,this.data.month,this.data.day);
    wx.showActionSheet({
      itemList: dakaChoice,
      success(res){
        var dakaInfo = wx.getStorageSync('dakaInfo')
        if (dakaInfo === null || dakaInfo === ""){
          dakaInfo = new Array;            
        }
        for(var i = 0, len = dakaInfo.length; i < len; i++){
          var item = dakaInfo[i];
          var dateTime = new Date(item['dakaTime']);
          if (dateTime.getMonth() === selectedDate.getMonth() && dateTime.getDate() === selectedDate.getDate()) {
            wx.showToast({
              title: '已经打卡过啦!',
              icon: 'none',
              duration: 1500
            });
            return
          }
        }
        var currentDate = new Date();
        if(selectedDate.getDate() > currentDate.getDate() || selectedDate.getMonth() > currentDate.getMonth() + 1 || selectedDate.getFullYear() > currentDate.getFullYear()){
          wx.showToast({
            title: '打卡时间不能大于当前时间哦',
            icon: 'none',
          });
          return
        }
        dakaInfo.push({
          dakaTime: selectedDate.getTime(),
          dakaDay: dakaChoice[res.tapIndex],
        });
        wx.setStorage({
          key: 'dakaInfo',
          data: dakaInfo,
          success(res){
            wx.showToast({
              title: '打卡成功!',
              icon: 'success',
              duration: 1500
            })
          },
        });
      },
    })
  },

  nextMonth: function(e){
    let calendar_days_style = getDaysColor(new Date(e.detail.currentYear, e.detail.currentMonth, 0), this.data.month,this.data.day);
    this.setData({
      calendar_days_style: calendar_days_style,
      str: MONTHS[e.detail.currentMonth - 1]
    });
  },

  onDayClick: function(e){
    console.log(e.detail)
    let calendar_days_style = getDaysColor(new Date(e.detail.year, e.detail.month, 0), e.detail.month, e.detail.day);
    this.setData({
      calendar_days_style: calendar_days_style,
      year: e.detail.year,
      month: e.detail.month,
      day: e.detail.day,
    });
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

function getDaysColor(e, currentMonth,currentDay){
  const days_count = e.getDate();
  const month = e.getMonth() + 1;
  let calendar_days_style = new Array;
  var currentDate = new Date();
  for (let i = 1; i <= days_count; i++) {
    if (i === currentDay && month === currentMonth) {
      calendar_days_style.push({
        month: 'current', day: i, color: 'white', background: '#8497ee'
      });
    } else if(i <= currentDate.getDate() && month <= currentDate.getMonth()+1){
      calendar_days_style.push({
        month: 'current', day: i, color: 'white'
      });
    }
  }
  return calendar_days_style;
}