console.log("Loading calendar...")
event_object = JSON.parse(events)
console.log(event_object.Random)
// Need to add some ID to tie together event date iwth date on calendar



// Globals
const calendarBtn = document.getElementsByName('calendar')[0]
const calendarCon = document.getElementById('calendar-container')
const date = new Date()


const days = [
    'Sunday',
    'Monday', 
    "Tuesday",
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

const months = [
    'January',
    'February',
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
]

function addCalendarHeader(month) {

    const calendarHeader = document.createElement('div')
    const currentMonth = document.createElement('h1')

    currentMonth.setAttribute('id','current-month')
    calendarHeader.setAttribute('id', 'calendar-header')

    currentMonth.innerText = months[month]

    for (let i = 0;i < 7; i++) {
        let dayHeader = document.createElement('p')
        dayHeader.classList.add('day-header')
        dayHeader.innerText = days[i]
        calendarHeader.appendChild(dayHeader)
    }

    calendarCon.appendChild(currentMonth)
    calendarCon.appendChild(calendarHeader)

}

function addCalendar() {

    // Get day, month, year date objects
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDay.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    })

    const paddingDays = days.indexOf(dateString.split(', ')[0]);
    console.log(dateString, daysInMonth, paddingDays)
    
    const calendarDiv = document.createElement('div')
    calendarDiv.setAttribute('id', 'calendar-main')


    for (let i = 1; i < 36; i++) {

        let paddingSquare = document.createElement('div')
        paddingSquare.classList.add('day-square')
        if (i < paddingDays + 1) {
            // Add blank squares
            // let paddingSquare = document.createElement('div');
            // paddingSquare.classList.add('day-square')
            calendarDiv.appendChild(paddingSquare)
        } else if (i > daysInMonth + paddingDays) {
            calendarDiv.appendChild(paddingSquare)
        } else {
            // Add corret dates for the current month
            let daySquare = document.createElement('div');
            let day = document.createElement('p')
            let event = document.createElement('p')
            event.classList.add('calendar-event')
            day.innerText = i - paddingDays
            // event.innerText = "event" // This should be whatever content the event is from the event model

            daySquare.appendChild(day)
            daySquare.appendChild(event)
            daySquare.classList.add('day-square')

            calendarDiv.appendChild(daySquare)
        }

    }
    
    // Add the header and append the completed calculator to the calendar Div
    addCalendarHeader(month)
    calendarCon.appendChild(calendarDiv)
}

function addEventToCalendar(eventsDict, calendar) {
    // Add events to the calendar using the events dictionary

}

// Modal functions for adding event model when user clicks
// on an event in the calendar
function addEventModal() {
    const eventDetailsModal = document.getElementById('calendar-event-modal')
    let eventDetails = document.createElement('div')
    eventDetails.classList.add('event-details')
    
    // createEventDetails(eventDetails)
    // eventDetailsModal.appendChild(eventDetails)
    let calendarEvent = document.querySelectorAll('.day-square')

    calendarEvent.forEach(element => {
        // Element is the calendar event content, should be loaded in Django, which can then be accessed here with JS
        element.addEventListener('click', () => {
            eventDetailsModal.style.display = 'block';
            createEventDetails(eventDetails, eventDetailsModal, element)
            eventDetailsModal.appendChild(eventDetails)
            // console.log(element.innerText.split('\n')[2]) // Element text is 1)Date, 2)\n, 3)Actual event content, splitting on \n gives an array
        })
    })
}

function createEventDetails(detailModal, eventDetailsModal, details) {
    const eventTitle = document.createElement('h3');
    const eventContent = document.createElement('p')
    const eventImage = document.createElement('img')
    // const closeModal = document.createElement('img') // X for closing the modal
    const closeModalBtn = document.createElement('h1')
    // Test info
    eventTitle.innerText = details.innerText.split('\n')[2]
    eventContent.innerText = 'Join us for some random fun event that is mostly used as a test to see if modal works!'
    closeModalBtn.innerText = 'X'

    detailModal.appendChild(eventTitle)
    detailModal.appendChild(eventContent)
    detailModal.appendChild(eventImage)
    detailModal.appendChild(closeModalBtn)

    closeModal(eventDetailsModal, closeModalBtn, detailModal)
}

function closeModal(detailModal, closeBtn, details) {
    closeBtn.addEventListener('click', ()=> {
        details.innerText = ''; // Clear out the details so they don't just stack on top everytime you click a calendar event
        detailModal.style.display = 'none';
    })
}

// When the calendar button is hit int he navbar, load the calendar and all it's functions
calendarBtn.addEventListener('click', () => {
    calendarCon.innerHTML = ''
    addCalendar()
    addEventModal()
})