console.log("Loading calendar...")

const calendarBtn = document.getElementsByName('calendar')[0]
const calendarCon = document.getElementById('calendar-container')
const date = new Date()
const currentMonth = new Date(2021, date.getMonth() + 1, 0)


const firstDay = new Date(2021, date.getMonth(), 1).getDay()
var Xmas95 = new Date(2021, date.getMonth() + 1, 0);
var weekday = Xmas95.getDay();

console.log(weekday);

var options = { weekday: 'long'};
console.log(new Intl.DateTimeFormat('en-US', options).format(Xmas95));
// Monday

function addCalendarHeader() {
    days = [
        'Sunday',
        'Monday', 
        "Tuesday",
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    const calendarHeader = document.createElement('div')
    calendarHeader.setAttribute('id', 'calendar-header')

    for (let i = 0;i < 7; i++) {
        let dayHeader = document.createElement('p')
        dayHeader.classList.add('day-header')
        dayHeader.innerText = days[i]
        calendarHeader.appendChild(dayHeader)
    }

    calendarCon.appendChild(calendarHeader)

}
function addCalendar() {
    console.log("Adding the calendar")

    const calendarDiv = document.createElement('div')
    calendarDiv.setAttribute('id', 'calendar-main')

    // For kicks, add 35 squares to check size

    for (let i = 1; i < 36; i++) {

        let day = document.createElement('p')
        day.innerText = i;

        let daySquare = document.createElement('div')
        daySquare.classList.add('day-square')
        daySquare.appendChild(day)
        
        calendarDiv.appendChild(daySquare)
    }
    
    addCalendarHeader()
    calendarCon.appendChild(calendarDiv)
}


calendarBtn.addEventListener('click', () => {
    calendarCon.innerHTML = ''
    addCalendar()

})