export default (time) => {
  let date = new Date(time);
  let seperator1 = "-";
  let seperator2 = ":";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  return date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + hours + seperator2 + minutes;
}
