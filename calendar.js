function getWeekDay(day) {
    var weekDay = day.getDay() - 1;
    if (weekDay == -1) {weekDay = 6};
    return weekDay;
}

function numDaysInMonth(month,year) {
    return new Date(year, month+1, 0).getDate();
}

function addTodayMark() {
    if ((newMonth == todayMonth) && (newYear === todayYear)) {
        for (i = 0; i < monthDays.length; i++) {
            if (monthDays[i].textContent == todayDay) {
                monthDays[i].className += " today";
            }
        }
    }
}

function chooseDay() {
    for (var i = 0; i < monthDays.length; i++) {
        monthDays[i].onclick = function() {
            for (var k = 0; k < monthDays.length; k++) {
                var day = monthDays[k];
                if (day.classList.contains("chosen")) {
                    day.classList.remove("chosen");
                }
            }
            var chosenDay = this.textContent;
            this.className += " chosen";
            var chosenDate = new Date();
            chosenDate.setFullYear(newYear, newMonth, chosenDay);
            chosenDateCont.textContent = chosenDay + ' ' + CALENDAR.monthsArray[todayMonth] + ' ' + newYear;
            return chosenDate;
        }
    }
}

function daysInMonth(newYear, newMonth) {
    var newMonthFirstDay = new Date(newYear, newMonth, 1);
    var newMonthLastDay = new Date(newYear, newMonth + 1, 0);
    var newMonthFirstWeekDay = getWeekDay(newMonthFirstDay);
    var newMonthLastWeekDay = getWeekDay(newMonthLastDay);
    var newMonthNumDays = numDaysInMonth(newMonth, newYear);
    var prevMonth = newMonth - 1;
    var prevYear = newYear;
    if (prevMonth == -1) {
        prevMonth = 11;
        prevYear =  prevYear - 1;
    }
    var prevMonthNumDays = numDaysInMonth(prevMonth, prevYear);
    var newMonthDaysBefore = [];
    var newMonthDays = [];
    var newMonthDaysAfter = [];
    for (var i = 0; i < newMonthFirstWeekDay; i++) {
        newMonthDaysBefore[newMonthFirstWeekDay - i - 1] = prevMonthNumDays - i;
    }
    for (var i = 1; i < newMonthNumDays+1; i++) {
        newMonthDays[i - 1] = i;
    }
    for (var i = 0; i < (6 - newMonthLastWeekDay); i++) {
        newMonthDaysAfter[i] = i+1;
    }
    var sourceCalendarDays   = document.getElementById('calendar-days-template').innerHTML;
    var templateCalendarDays = Handlebars.compile(sourceCalendarDays);
    calendarDaysCont.innerHTML = templateCalendarDays({days: newMonthDays, 
                                                    beforedays: newMonthDaysBefore,
                                                    afterdays: newMonthDaysAfter});
}

var CALENDAR = {
   "monthsArray" : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
   "monthsNumArray": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
}

var calendarDaysCont = document.getElementById('calendar-days');
var monthDays = calendarDaysCont.getElementsByClassName('calendar_days_date active');
var chosenDateCont = document.getElementById('chosen_date');
var arrowMonth = document.getElementsByClassName('calendar_month_arrow');
var today = new Date();
var todayMonth = today.getMonth();
var todayYear = today.getFullYear();
var todayDay = today.getDate();
var todayWeekDay = getWeekDay(today);
var newYear = todayYear;
var newMonth = todayMonth;
var chosenDate = today;

var monthTitle = document.getElementById("cur_month");
monthTitle.textContent = CALENDAR.monthsArray[todayMonth] + ' ' + todayYear;

daysInMonth(newYear, newMonth);
addTodayMark();
chooseDay();

arrowMonth[0].onclick = function() {
    if (newMonth == 0) {
        newYear = newYear - 1;
        newMonth = 11;
    } else {
        newMonth = newMonth - 1;
    }
    monthTitle.textContent = CALENDAR.monthsArray[newMonth] + ' ' + newYear;
    daysInMonth(newYear, newMonth); 
    addTodayMark();  
    // chooseDay(); 
}


arrowMonth[1].onclick = function() {
    if (newMonth == 11) {
        newYear = newYear + 1;
        newMonth = 0;
    } else {
        newMonth = newMonth + 1;
    }
    monthTitle.textContent = CALENDAR.monthsArray[newMonth] + ' ' + newYear;
    daysInMonth(newYear, newMonth);
    addTodayMark();
    chooseDay();
}