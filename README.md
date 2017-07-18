# 微信小程序-年月日时分秒六级联动时间选择器
上篇我们介绍过三级联动区域选择器，今天给大家分享一个时间选择器。大体思路跟上一个差不多就不赘述了，而且相对区域选择器还没那么复杂，数据基本也是死的，用系统方法就可以获取当前时间。

值得注意的是，滑动月份的时候每个月的天数是不固定的。也就是会存在每月28、29、30或31天的情况。我们要做出判断，实时更新天数。

我们可以用这个方法获取当前年月的天数
```
//输入年、月计算当月天数并推入数组
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
```
![图1 最终效果](https://static.oschina.net/uploads/img/201707/17174637_oHEm.png)

如果不需要秒的同学，可以自行去掉一个<picker-view-column></picker-view-column>做些相应的修改就可以了。

