function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

function chooseTimeFormat(callback) {
  //格式化日期时间
  Date.prototype.pattern = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份         
      "d+": this.getDate(), //日         
      "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
      "H+": this.getHours(), //小时         
      "m+": this.getMinutes(), //分         
      "s+": this.getSeconds(), //秒         
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
      "S": this.getMilliseconds() //毫秒         
    };
    var week = {
      "0": "/u65e5",
      "1": "/u4e00",
      "2": "/u4e8c",
      "3": "/u4e09",
      "4": "/u56db",
      "5": "/u4e94",
      "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }

  var date = new Date();
  console.log("格式化前：" + date);
  var fmtDate = date.pattern("yyyy-MM-dd hh:mm:ss");
  console.log("格式化后：" + fmtDate);
  callback(fmtDate, date);

}
module.exports.chooseTimeFormat = chooseTimeFormat;
