/**
 * Created by yuchuang on 2017/8/31.
 * 返回日期
 */
export function dateDiff(hisTime,nowTime){
  if(!arguments.length) return '';
  var arg = arguments,
    now =arg[1]?arg[1]:new Date().getTime(),
    diffValue = now - arg[0].getTime(),
    result={
      isToday:false
    },
    minute = 1000 * 60,
    hour = minute * 60,
    day = hour * 24,
    halfamonth = day * 15,
    month = day * 30,
    year = month * 12,

    _year = diffValue/year,
    _month =diffValue/month,
    _week =diffValue/(7*day),
    _day =diffValue/day,
    _hour =diffValue/hour,
    _min =diffValue/minute;

  if(new Date().toDateString()==hisTime.toDateString()){
    result.isToday=true;
  }
  if(_year>=1) result.text=parseInt(_year) + "年前";
  else if(_month>=1) result.text=parseInt(_month) + "个月前";
  else if(_week>=1) result.text=parseInt(_week) + "周前";
  else if(_day>=1) result.text=parseInt(_day) +"天前";
  else if(_hour>=1) result.text=parseInt(_hour) +"小时前";
  else if(_min>=1) result.text=parseInt(_min) +"分钟前";
  else result.text="刚刚";
  return result;
}
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
