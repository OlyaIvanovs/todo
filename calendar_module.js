function MyCalendar() {
    let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthsNumArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    let calendarDaysCont = document.getElementById('calendar-days');
    let monthDays = calendarDaysCont.getElementsByClassName('calendar_days_date active');
    let chosenDateCont = document.getElementById('chosen_date');
    let arrowMonth = document.getElementsByClassName('calendar_month_arrow');
    let today = new Date();
    let todayMonth = today.getMonth();
    let todayYear = today.getFullYear();
    let todayDay = today.getDate();
    let todayWeekDay = getWeekDay(today);
    let newYear = todayYear;
    let newMonth = todayMonth;
    let chosenDate = today;
    let monthTitle = document.getElementById("cur_month");

    function getWeekDay(day) {
        let weekDay = day.getDay() - 1;
        if (weekDay == -1) {weekDay = 6};
        return weekDay;
    }

    function numDaysInMonth(month,year) {
        return new Date(year, month+1, 0).getDate();
    }

    function addTodayMark() {
        if ((newMonth == todayMonth) && (newYear === todayYear)) {
            for (let i = 0; i < monthDays.length; i++) {
                if (monthDays[i].textContent == todayDay) {
                    monthDays[i].className += " today";
                }
            }
        }
    }

    function chooseDay() {
        for (let i = 0; i < monthDays.length; i++) {
            monthDays[i].onclick = function() {
                for (let k = 0; k < monthDays.length; k++) {
                    let day = monthDays[k];
                    if (day.classList.contains("chosen")) {
                        day.classList.remove("chosen");
                    }
                }
                let chosenDay = this.textContent;
                this.className += " chosen";
                let chosenDate = new Date();
                chosenDate.setFullYear(newYear, newMonth, chosenDay);
                // chosenDateCont.textContent = chosenDay + ' ' + CALENDAR.monthsArray[todayMonth] + ' ' + newYear;
                chosenDateCont.value = "" + chosenDay + ' ' + monthsArray[newMonth] + ' ' + newYear;
                return saveDate(chosenDate);
            }
        }
    }

    function saveDate(date) {
        chosenDate = date;
    }

    function getChosenDateCont() {
        return chosenDateCont;
    }

    function getChosenDate() {
        return chosenDate;
    }

    function daysInMonth(newYear, newMonth) {
        let newMonthFirstDay = new Date(newYear, newMonth, 1);
        let newMonthLastDay = new Date(newYear, newMonth + 1, 0);
        let newMonthFirstWeekDay = getWeekDay(newMonthFirstDay);
        let newMonthLastWeekDay = getWeekDay(newMonthLastDay);
        let newMonthNumDays = numDaysInMonth(newMonth, newYear);
        let prevMonth = newMonth - 1;
        let prevYear = newYear;
        if (prevMonth == -1) {
            prevMonth = 11;
            prevYear =  prevYear - 1;
        }
        let prevMonthNumDays = numDaysInMonth(prevMonth, prevYear);
        let newMonthDaysBefore = [];
        let newMonthDays = [];
        let newMonthDaysAfter = [];
        for (let i = 0; i < newMonthFirstWeekDay; i++) {
            newMonthDaysBefore[newMonthFirstWeekDay - i - 1] = prevMonthNumDays - i;
        }
        for (let i = 1; i < newMonthNumDays+1; i++) {
            newMonthDays[i - 1] = i;
        }
        for (let i = 0; i < (6 - newMonthLastWeekDay); i++) {
            newMonthDaysAfter[i] = i+1;
        }
        let sourceCalendarDays   = document.getElementById('calendar-days-template').innerHTML;
        let templateCalendarDays = Handlebars.compile(sourceCalendarDays);
        calendarDaysCont.innerHTML = templateCalendarDays({days: newMonthDays, 
                                                        beforedays: newMonthDaysBefore,
                                                        afterdays: newMonthDaysAfter});
    }

    monthTitle.textContent = monthsArray[todayMonth] + ' ' + todayYear;
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
        monthTitle.textContent = monthsArray[newMonth] + ' ' + newYear;
        daysInMonth(newYear, newMonth); 
        addTodayMark();  
        chooseDay(); 
    }


    arrowMonth[1].onclick = function() {
        if (newMonth == 11) {
            newYear = newYear + 1;
            newMonth = 0;
        } else {
            newMonth = newMonth + 1;
        }
        monthTitle.textContent = monthsArray[newMonth] + ' ' + newYear;
        daysInMonth(newYear, newMonth);
        addTodayMark();
        chosenDate = chooseDay();
    }

    let publicAPI = {
        chosenDateCont: getChosenDateCont,
        chosenDate: getChosenDate,
    } 

    return publicAPI;
}





