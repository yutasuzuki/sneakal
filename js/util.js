/**
* yyyy-mm-dd hh:mm:ss で時間を返す
*/
function getdate() {
  let dateObj = new Date();
  let year = dateObj.getYear() + 1900;
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();
  if (month < 10){ month = "0" + month; }
  if (day < 10){ day = "0" + day; }
  if (hours < 10){ hours = "0" + hours; }
  if (minutes < 10){ minutes = "0" + minutes; }
  if (seconds < 10){ seconds = "0" + seconds; }
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}
/**
* 日付を表示用に変換
*/
export function diffDate(date){
  const month = date.slice(5,7);
  const day = date.slice(8,10);
  const hour = date.slice(11,13);
  const minute = date.slice(14,16);
  let result;
  if (diffMonth(getdate(),date) == 0 || diffYear(getdate(),date) == 0) {
    if (diffDay(getdate(),date) == 0) {
      result = "今日 " + hour + ":" + minute;
    } else if (diffDay(getdate(),date) == 1) {
      result = "昨日 " + hour + ":" + minute;
    } else if (1 < diffDay(getdate(),date) && diffDay(getdate(),date) < 7) {
      result = diffDay(getdate(),date) +"日前 " + hour + ":" + minute;
    } else {
      result = month + "-" + day + " " + hour + ":" + minute;
    }
  } else {
      result = date;
  }
  return result;
}

function diffYear(today,date){
  return today.slice(0,4) - date.slice(0,4);
}

function diffMonth(today,date){
  return today.slice(5,7) - date.slice(5,7);
}

function diffDay(today,date){
  return today.slice(8,10) - date.slice(8,10);
}
