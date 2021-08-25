console.log("Loading calendar...")

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
    // Add headers for the calendar, Month, days of week
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
    // Create and populate the calendar and add it to the page

    // Get day, month, year date objects
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDay = new Date(year, month, 1); // First day of month object
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get total days in month, 0 returns the last day in month

    const dateString = firstDay.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    })

    // Getting events from python
    let dateCompare = date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }).replaceAll('/', '_') // Replace the / with _ in datestring to make it compatible as a dynamic url

    // Change the key for events to equal the date
    // Match any events in the events ibject to calendar dates

    const paddingDays = days.indexOf(dateString.split(', ')[0]);
    // console.log(dateString, daysInMonth, paddingDays)

    const calendarDiv = document.createElement('div')
    calendarDiv.setAttribute('id', 'calendar-main')

    // Add squars to the calendar, adding numerical dates and event titles (if they exist)
    for (let i = 1; i < 36; i++) {

        let paddingSquare = document.createElement('div')
        paddingSquare.classList.add('day-square')
        if (i < paddingDays + 1) {
            // Add blank squares

            calendarDiv.appendChild(paddingSquare)
        } else if (i > daysInMonth + paddingDays) {
            calendarDiv.appendChild(paddingSquare)
        } else {
            // Add correct dates for the current month
            let daySquare = document.createElement('div');
            let day = document.createElement('p') // Numerical date on the calendar
            let eventTitle = document.createElement('p') // Event title on the calendar
            eventTitle.classList.add('calendar-event')
            day.innerText = i - paddingDays

            // Add events if event for the day
            let dayDate = String(month + 1) + '/' + day.innerText + '/' + String(year)
            addEventToCalendar(JSON.parse(events), dayDate, eventTitle)
            // event.innerText = "event" // This should be whatever content the event is from the event model

            daySquare.appendChild(day)
            daySquare.appendChild(eventTitle)
            daySquare.classList.add('day-square')
            daySquare.setAttribute('data-date', dayDate)

            calendarDiv.appendChild(daySquare)
        }

    }
    
    // Add the header and append the completed calculator to the calendar Div
    addCalendarHeader(month)
    calendarCon.appendChild(calendarDiv)
}

function addEventToCalendar(eventsDict, date, eventTitle) {
    // Add event titles to the calendar using the events dictionary
    // Event keys are dates, as such need to match up correctly with month/year of current calendar
    // JS formats dates as '8/15/2021', no leading 0 on months
    let keys = Object.keys(eventsDict)

    for (i = 0; i < keys.length;i++) {

        if (keys[i] === date) {
            console.log("Dates match", keys[i], date)
            eventTitle.innerText = eventsDict[date][0]

        }
    }
    
    // Match Events with current month(accounting for year, although it's probably safe to just delete events when the next
    // month begins) Month variable in events dict should be month - 1 to match up with how JS does months (Jan = index 0)


    // Match dates on the calendar with correct event dates
}


// Modal functions for adding event model when user clicks
// on an event in the calendar
function addEventModal() {

    const eventDetailsModal = document.createElement('div')
    eventDetailsModal.setAttribute('id', 'calendar-event-modal')

    let eventDetails = document.createElement('div')
    eventDetails.classList.add('event-details')
    
    let calendarEvent = document.querySelectorAll('.day-square')

    // Make squares clickable and bring up a modal with the event details for that squares date
    calendarEvent.forEach(element => {
        // Element is the calendar event content, should be loaded in Django, which can then be accessed here with JS
        element.addEventListener('click', () => {
            eventDetailsModal.style.display = 'block';
            createEventDetails(eventDetails, eventDetailsModal, element)
            eventDetailsModal.appendChild(eventDetails)
            // console.log(element.innerText.split('\n')[2]) // Element text is 1)Date, 2)\n, 3)Actual event content, splitting on \n gives an array
        })
    })

    calendarCon.appendChild(eventDetailsModal)
}

function createEventDetails(detailModal, eventDetailsModal, details) {
    // getEventDetails()

    const eventTitle = document.createElement('h3');
    const eventContent = document.createElement('p')
    const eventImage = document.createElement('img')
    const closeModalBtn = document.createElement('h1')
    closeModalBtn.classList.add('close-modal')

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

function getEventDetails(date) {
    // Make a request to the DB to get the event details for a given date
    // Date is the key to the dicitionary with event details
    
    // Maybe get the event details response, and in this function, run the addtoModal() function with the events
    // Since this function keeps returning undefined
    fetch(`events/${date}`)
    .then(response => response.json())
    .then(eventArray => {
        console.log("In promise", eventArray)
        return eventArray
        // if (events != undefined) {

        //     // console.log("Events in promise", events)
        //     return events
        // }
    })
    .catch(error => console.log("No events for this day :( "))


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

// getEventDetails('8_1_2021')
// Test events

test = getEventDetails('8_1_2021')
// console.log("Test fetch", test)
console.log(test)


// parsedEvents = JSON.parse(events)
// addEventToCalendar(parsedEvents, '08/21/2021')