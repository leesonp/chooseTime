// chooseTime.js
var util = require('../../utils/util.js')
var cellId;
var date = new Date();
var years =[];
var months = [];
var days = [];
var hours = [];
var minutes = [];
var seconds = [];

var nowYear;
var nowMonth;
var nowDay;
var nowHour;
var nowMinute;
var nowSecond;

var t = 0;
var show = false;
var moveY = 200;

for (let i = new Date().getFullYear(); i < 2117; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  i = zeroPadding(i);
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  i = zeroPadding(i);
  days.push(i)
}

for (let i = 0; i <= 23; i++) {
  i = zeroPadding(i);
  hours.push(i)
}
for (let i = 0; i <= 59; i++) {
  i = zeroPadding(i);
  minutes.push(i)
}
for (let i = 0; i <= 59; i++) {
  i = zeroPadding(i);
  seconds.push(i)
}

Page({
  //数组必须在此初始化赋值 否则 value:[0,0,0,0,0];
  data: {
    years: years,
    months: months,
    days: days,
    hours:hours,
    minutes: minutes,
    seconds: seconds
  },
   // 生命周期函数--监听页面加载
  onLoad: function (options) {
    //接收上个界面传来的Id
    cellId = options.cellId;

    util.chooseTimeFormat(function (data, nowDate) {
      console.log("回调的格式化前时间:" + nowDate);
      console.log("回调的格式化后时间:"+ data);   

      //不能用此时间 除非重启小程序才会更新 且有延迟(原因未知) 
      console.log("当前页面定义的时间:" + date);
    });
    var that = this;

    //获取时间
    getNowDate(new Date());
    // 初始化
    days = getDays(nowYear, nowMonth);
    that.setData({
      year: nowYear,
      month: zeroPadding(nowMonth),
      days: days,
      day: zeroPadding(nowDay),
      hour: zeroPadding(nowHour),
      minute: zeroPadding(nowMinute),
      second: zeroPadding(nowSecond),
      value: [nowYear - 2017, nowMonth - 1, nowDay - 1, nowHour, nowMinute, nowSecond]
    })

  },
  // 滑动事件
  bindChange: function (e) {
    const val = e.detail.value

    // 获取天数
    days = getDays(val[0] + 2017, val[1] + 1);

    this.setData({
      days: days,
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[3]],
      minute: this.data.minutes[val[4]],
      second: this.data.seconds[val[5]]
    })
  },
  // ------------------- 分割线 --------------------
  onReady: function () {
    this.animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 0,
      timingFunction: "ease",
      delay: 0
    }
    )
    this.animation.translateY(200 + 'vh').step();
    this.setData({
      animation: this.animation.export(),
      show: show
    })
  },
  //移动按钮点击事件
  translate: function (e) {
    if (t == 0) {
      moveY = 0;
      show = false;
      t = 1;
    } else {
      moveY = 200;
      show = true;
      t = 0;
    }
    // this.animation.translate(arr[0], arr[1]).step();
    animationEvents(this, moveY, show);

  },
  //隐藏弹窗浮层
  hiddenFloatView() {
    moveY = 200;
    show = true;
    t = 0;
    animationEvents(this, moveY, show);

  },
  //页面滑至底部事件
  onReachBottom: function () {
    // Do something when page reach bottom.
  }
})

//动画事件
function animationEvents(that, moveY, show) {
  console.log("moveY:" + moveY + "\nshow:" + show);
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  }
  )
  that.animation.translateY(moveY + 'vh').step()

  that.setData({
    animation: that.animation.export(),
    show: show
  })

}


//输入年、月计算当月天数
var getDays = function (year, month) {
  // month 取自然值，从 1-12 而不是从 0 开始
  var dayCount = new Date(year, month, 0).getDate();
  // 如果 month 按 javascript 的定义从 0 开始的话就是
  // return new Date(year, month + 1, 0).getDate()

  var tempDays = [];
  for (let i = 1; i <= dayCount; i++) {
    i = zeroPadding(i);
    tempDays.push(i)
  }
  return tempDays;
}

// 自动补零
function zeroPadding(i){
  return ('0' + i).slice(-2);
  // return (Array(2).join(0) + i).slice(-2);
}

//获取当前年月日时分秒
function getNowDate(date){
   nowYear = date.getFullYear();
   nowMonth = date.getMonth() + 1;
   nowDay = date.getDate();
   nowHour = date.getHours();
   nowMinute = date.getMinutes();
   nowSecond = date.getSeconds();
}

// 反向传值
function nav_back(that){
  var rewriteTime = that.data.year + "-" + that.data.month + "-" + that.data.day + " " + that.data.hour + ":" + that.data.minute + ":" + that.data.second;

  var pages = getCurrentPages();
  var currPage = pages[pages.length - 1];   //当前页面
  var prevPage = pages[pages.length - 2];  //上一个页面

  //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
  if (cellId == "21") {
    prevPage.setData({
      starTime: rewriteTime
    })
  } else if(cellId == "22") {
    prevPage.setData({
      endTime: rewriteTime
    })
  }  
  console.log(prevPage.data);
  var a = ''
}