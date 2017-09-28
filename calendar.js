function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

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
var diffMonth = 0;
var diffYear = 0;
var newYear = todayYear + diffYear;
var months = [];

var monthTitle = document.getElementById("cur_month");
monthTitle.textContent = CALENDAR.monthsArray[todayMonth] + ' ' + todayYear;
var arrowMonth = document.getElementsByClassName('calendar_month_arrow');
arrowMonth[0].onclick = function() {
    //????
    var prevMonthNumDays = daysInMonth(newMonth, newYear);
    var newMonthDays = []
    diffMonth = diffMonth - 1;
    var newMonth = todayMonth + diffMonth - diffYear*12;
    monthTitle.textContent = CALENDAR.monthsArray[newMonth] + ' ' + newYear;
    if (newMonth == 0) {
        diffYear = diffYear - 1;
        newYear = todayYear + diffYear;
    }
    var newMonthFirstDay = new Date(newYear, newMonth, 1);
    var newMonthFirstWeekDay = newMonthFirstDay.getDay() - 1;
    if (newMonthFirstWeekDay == -1) {newMonthFirstWeekDay = 6};
    var newMonthNumDays = daysInMonth(newMonth, newYear);

    for (var i = (newMonthFirstWeekDay); i > 0; i--) {
        newMonthDays[i-1] = prevMonthNumDays - i + 1;
    }

    var sourceCalendarDays   = document.getElementById('calendar-days-template').innerHTML;
    var templateCalendarDays = Handlebars.compile(sourceCalendarDays);
    // toDosAllCont.innerHTML = templateListTodos({days: newMonthDays});



    // var month = {
    //     'date': newMonthFirstDay,
    //     'weekDay': newMonthFirstWeekDay,
    //     'numDays': 
    // }
}
arrowMonth[1].onclick = function() {
    diffMonth = diffMonth + 1;
    var newMonth = todayMonth + diffMonth - diffYear*12;
    monthTitle.textContent = CALENDAR.monthsArray[newMonth] + ' ' + newYear;
    if (newMonth == 11) {
        diffYear = diffYear + 1;
        newYear = todayYear + diffYear;
    }
}
