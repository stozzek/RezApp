var Calendar = {
  month: document.querySelectorAll('[data-calendar-area="month"]')[0],
  next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
  previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
  label: document.querySelectorAll('[data-calendar-label="month"]')[0],
  activeDates: null,
  date: new Date(),
  todaysDate: new Date(),

  init: function (options) {
    this.options = options
    this.date.setDate(1)
    this.createMonth()
    this.createListeners()
  },

  createListeners: function () {
    var _this = this
    this.next.addEventListener('click', function () {
      _this.clearCalendar()
      var nextMonth = _this.date.getMonth() + 1
      _this.date.setMonth(nextMonth)
      _this.createMonth()
    })
    // Clears the calendar and shows the previous month
    this.previous.addEventListener('click', function () {
      _this.clearCalendar()
      var prevMonth = _this.date.getMonth() - 1
      _this.date.setMonth(prevMonth)
      _this.createMonth()
    })
  },
  
  createDay: function (num, day, year) {
    var newDay = document.createElement('div')
    var dateEl = document.createElement('span')
  
    newDay.setAttribute('data-target','#myModal1') 
    newDay.setAttribute('data-toggle','modal') 
  
      var weekday=new Array(7);
      weekday[1]="Monday";
      weekday[2]="Tuesday";
      weekday[3]="Wednesday";
      weekday[4]="Thursday";
      weekday[5]="Friday";
      weekday[6]="Saturday";
      weekday[0]="Sunday";
      
      var month=new Array(7);
      month[0]="January";
      month[1]="February";
      month[2]="March";
      month[3]="April";
      month[4]="May";
      month[5]="June";
      month[6]="July";
      month[7]="August";
      month[8]="September";
      month[9]="October";
      month[10]="November";
      month[11]="December";
// console.log("Today is " + weekday[this.date.getDay()]);

    dateEl.innerHTML = num
    newDay.className = 'vcal-date'
    newDay.setAttribute('data-calendar-date', this.date)
    newDay.setAttribute('data-calendar-date-day', weekday[this.date.getDay()])
    newDay.setAttribute('data-calendar-date-month',month[this.date.getMonth()])
    
    // console.log(num)
    // console.log(newDay.dataset)
    // console.log(dateEl)

    // if it's the first day of the month
    if (num === 1) {
      if (day === 0) {
        newDay.style.marginLeft = (6 * 14.28) + '%'
      } else {
        newDay.style.marginLeft = ((day - 1) * 14.28) + '%'
      }
    }
    if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1 ) {
      newDay.classList.add('vcal-date--disabled')
      newDay.removeAttribute('data-target')
      newDay.removeAttribute('data-toggle')
    } else {
      newDay.classList.add('vcal-date--active')
      newDay.setAttribute('data-calendar-status', 'active')
    }

    if (this.date.toString() === this.todaysDate.toString()) {
      newDay.classList.add('vcal-date--today')
    }

    newDay.appendChild(dateEl)
    this.month.appendChild(newDay)
  },

  dateClicked: function () {
    var _this = this
    this.activeDates = document.querySelectorAll('[data-calendar-status="active"]')

    for (var i = 0; i < this.activeDates.length; i++) {
      var k = i;
      
      this.activeDates[i].addEventListener('click', function (event) {
        var picked = document.querySelectorAll('[data-calendar-label="picked"]')[0]
        var ThisDay = document.querySelectorAll('[data-calendar-label="ThisDay"]')[0]
        var ThisMonth = document.querySelectorAll('[data-calendar-label="ThisMonth"]')[0]
        // console.log(document.querySelectorAll('span'))
        // console.log()
        // console.log(this.dataset)
        picked.innerHTML = this.dataset.calendarDate + ' ' + this.dataset.calendarDateDay + ' ' + this.dataset.calendarDateMonth
        ThisDay.innerHTML = this.dataset.calendarDateDay
        ThisMonth.innerHTML = this.dataset.calendarDateMonth
       
        
    
        var pickedDay = this.querySelectorAll('span')[0].innerHTML
        document.getElementById("PD").innerHTML = pickedDay;
    
    
        var alll = pickedDay + ' ' +  ThisDay.innerHTML + ' ' + ThisMonth.innerHTML
        document.getElementById("alll").innerHTML = alll;

        _this.removeActiveClass()
        this.classList.add('vcal-date--selected')
        
        B(picked) // przekazuje zmienna picked
      })
    }
  },

  createMonth: function () {
    var currentMonth = this.date.getMonth()
    while (this.date.getMonth() === currentMonth) {
      this.createDay(
        this.date.getDate(),
        this.date.getDay(),
        this.date.getFullYear()
      )
      this.date.setDate(this.date.getDate() + 1)
    }
    // while loop trips over and day is at 30/31, bring it back
    this.date.setDate(1)
    this.date.setMonth(this.date.getMonth() - 1)

    this.label.innerHTML =
      this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
    this.dateClicked()
  },

  monthsAsString: function (monthIndex) {
    return [
      'January',
      'Febuary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ][monthIndex]
  },

  clearCalendar: function () {
    Calendar.month.innerHTML = ''
  },

  removeActiveClass: function () {
    for (var i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].classList.remove('vcal-date--selected')
    }
  },

  
}
