var CALENDAR = {
   "monthsArray" : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
   "monthsNumArray": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
}

var today = new Date();
var todayMonth = today.getMonth();
var todayYear = today.getFullYear();
var todayDay = today.getDate();
var todayWeekDay = today.getDay() - 1;
if (todayWeekDay == -1) {todayWeekDay = 6};

var monthTitle = document.getElementById("cur_month");
monthTitle.textContent = CALENDAR.monthsArray[todayMonth] + ' ' + todayYear;

