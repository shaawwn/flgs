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

    // Add squares to the calendar, adding numerical dates and event titles (if they exist)
    let calendarSquares = 36
    for (let i = 1; i < calendarSquares; i++) {

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
            let eventDate = document.createElement('p')
            eventTitle.classList.add('calendar-event')
            eventDate.classList.add('calendar-event-date')

            day.innerText = i - paddingDays

            // Add events if event for the day
            let dayDate = String(month + 1) + '_' + day.innerText + '_' + String(year) // Change from _ to / to match python
            addEventToCalendar(JSON.parse(events), dayDate, eventTitle, daySquare, eventDate)

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


function addEventToCalendar(eventsDict, date, eventTitle, daySquare, eventDate) {
    // Add event titles to the calendar using the events dictionary
    // Event keys are dates, as such need to match up correctly with month/year of current calendar
    // JS formats dates as '8/15/2021', no leading 0 on months
    let keys = Object.keys(eventsDict)
    let formattedDate = date.replaceAll('_', '/') // Formatting date so that it matches the string from python date object

    for (i = 0; i < keys.length;i++) {

        if (keys[i] === formattedDate) {

            if (eventsDict[formattedDate][2] != null) { //If there is an image associated with event, use on calendar instead of text title
                let eventImageSm = document.createElement('img')
                eventImageSm.classList.add('event-image')
                eventImageSm.setAttribute('src', eventsDict[formattedDate][2])
                eventTitle.appendChild(eventImageSm)
            } else {
                console.log(eventsDict, keys[i])
                eventTitle.innerText = eventsDict[formattedDate][0]
                // eventDate.innerText = keys[i]
            }

            daySquare.classList.add('event')
        }
    }    
}


function closeModal(detailModal, closeBtn, details) {
    closeBtn.addEventListener('click', ()=> {
        details.innerText = ''; // Clear out the details so they don't just stack on top everytime you click a calendar event
        detailModal.style.display = 'none';
    })
}


function getEventDetails(date) {
    // Get events for a given date
    return fetch(`events/${date}`)
}


function createEventModal() {
    // Create a modal to display events for a day
    const eventDetailsModal = document.createElement('div')
    eventDetailsModal.setAttribute('id', 'calendar-event-modal')

    // let calendarEvents = document.querySelectorAll('.day-square')
    let calendarEvents = document.querySelectorAll('.event')
    calendarEvents.forEach(element => {
        element.addEventListener('click', () => {
            let eventDate = element.getAttribute('data-date')
            let eventDetails = getEventDetails(eventDate)

            addEventDetailsToModal(eventDetails)
            eventDetailsModal.style.display = 'block';
        })
    })

    calendarCon.appendChild(eventDetailsModal)
}


function addEventDetailsToModal(eventDetails) {
    // Add the event details the event details to the modal
    // eventDetails is a promise (hopefully fulfilled)
    let calendarEventModal = document.getElementById('calendar-event-modal')
    calendarEventModal.innerHTML = ''; // This clears out the HTML for the event modal so it stops stacking everytime you click
    let eventDetailsContainer = document.createElement('div')
    eventDetailsContainer.classList.add('event-details')

    eventDetails.then(response => response.json())
    .then(eventArray => {
        console.log("Creating details and adding to modal", eventArray)

        createEventDetails(eventDetailsContainer, eventArray)
    })

}


function createEventDetails(detailModal, details) {
    // getEventDetails()

    // Test info
    for (let i = 0; i < details.length;i++) {
        console.log("MODAL DATE", details[i].date, months[details[i].date[6] - 1])
        const eventTitle = document.createElement('h3');
        const eventDate = document.createElement('p')
        const eventContent = document.createElement('p')
        const eventImage = document.createElement('img')

        let eventMonth = months[details[i].date[6] - 1]
        let eventDayDate = details[i].date[8] + details[i].date[9]
        eventTitle.classList.add('event-detail-title');
        eventDate.classList.add('calendar-event-date')
        eventTitle.innerText= details[i].title
        eventDate.innerText = "6pm - 9pm," + eventMonth + ' ' +  eventDayDate
        eventContent.innerText = details[i].content

        detailModal.appendChild(eventTitle)
        detailModal.appendChild(eventDate)
        detailModal.appendChild(eventContent)
        detailModal.appendChild(eventImage)

        // eventDetailsModal is the whole modal, not jsut details, close to bnring back the calendar
        let eventDetailsModal = document.getElementById('calendar-event-modal')

        if (i === details.length - 1) {
            const closeModalBtn = document.createElement('h1')
            closeModalBtn.classList.add('close-modal')
            closeModalBtn.innerText = 'X'
            detailModal.appendChild(closeModalBtn)
            closeModal(eventDetailsModal, closeModalBtn, detailModal)
        }

        eventDetailsModal.appendChild(detailModal)
    }


}
// When the calendar button is hit int he navbar, load the calendar and all it's functions
calendarBtn.addEventListener('click', () => {
    calendarCon.innerHTML = ''
    addCalendar()
    createEventModal()
})

