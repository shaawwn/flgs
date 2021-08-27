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
            eventTitle.classList.add('calendar-event')
            day.innerText = i - paddingDays

            // Add events if event for the day
            let dayDate = String(month + 1) + '_' + day.innerText + '_' + String(year) // Change from _ to / to match python
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
    let formattedDate = date.replaceAll('_', '/') // Formatting date so that it matches the string from python date object

    for (i = 0; i < keys.length;i++) {

        if (keys[i] === formattedDate) {
            // console.log("Dates match", keys[i], date)
            eventTitle.innerText = eventsDict[formattedDate][0]

        }
    }
    
}


function addEventDetailListeners() {
    // Add event listeners to each calendar square to bring up event detail modal
    let calendarEvent = document.querySelectorAll('.day-square')

    calendarEvent.forEach(element => {
        console.log("Adding listeners")
        element.addEventListener('click', () => {
            console.log("CALENDAR ELEMENT", element)
            // eventDetailsModal.style.display = 'block';
            // createEventDetails(eventDetails, eventDetailModal, element)
            // eventDetailsModal.appendChild(eventDetails)
        })
    })
}


// addEventDetailListeners()


// function addEventModal(eventsArray) {

//     const eventDetailsModal = document.createElement('div')
//     eventDetailsModal.setAttribute('id', 'calendar-event-modal')

//     let eventDetails = document.createElement('div')
//     eventDetails.classList.add('event-details')
    
//     let calendarEvent = document.querySelectorAll('.day-square')

//     // Make squares clickable and bring up a modal with the event details for that squares date
//     calendarEvent.forEach(element => {
//         // Element is the calendar event content, should be loaded in Django, which can then be accessed here with JS
//         element.addEventListener('click', () => {
//             let eventDate = element.getAttribute('data-date')
//             getEventDetails(eventDate)
//             eventDetailsModal.style.display = 'block';
//             createEventDetails(eventDetails, eventDetailsModal, element)
//             eventDetailsModal.appendChild(eventDetails)
//             // console.log(element.innerText.split('\n')[2]) // Element text is 1)Date, 2)\n, 3)Actual event content, splitting on \n gives an array
//         })
//     })

//     calendarCon.appendChild(eventDetailsModal)
// }


// function createEventDetails(detailModal, eventDetailsModal, details) {
//     // getEventDetails()

//     const eventTitle = document.createElement('h3');
//     const eventContent = document.createElement('p')
//     const eventImage = document.createElement('img')
//     const closeModalBtn = document.createElement('h1')
//     closeModalBtn.classList.add('close-modal')

//     // Test info
//     eventTitle.innerText = details.innerText.split('\n')[2]
//     eventContent.innerText = 'Join us for some random fun event that is mostly used as a test to see if modal works!'
//     closeModalBtn.innerText = 'X'

//     detailModal.appendChild(eventTitle)
//     detailModal.appendChild(eventContent)
//     detailModal.appendChild(eventImage)
//     detailModal.appendChild(closeModalBtn)

//     closeModal(eventDetailsModal, closeModalBtn, detailModal)
// }

// function getEventDetails(date) {
//     // Make a request to the DB to get the event details for a given date
//     // Date is the key to the dicitionary with event details
    
//     // Maybe get the event details response, and in this function, run the addtoModal() function with the events
//     // Since this function keeps returning undefined
//     console.log("Date in getDetails", date)
//     fetch(`events/${date}`)
//     .then(response => response.json())
//     .then(eventArray => {
//         console.log("In promise", eventArray,date)

//         addEventModal(eventArray)

//     })
//     .catch(error => console.log("No events for this day :( or some internal error "))


// }

function closeModal(detailModal, closeBtn, details) {
    closeBtn.addEventListener('click', ()=> {
        details.innerText = ''; // Clear out the details so they don't just stack on top everytime you click a calendar event
        detailModal.style.display = 'none';
    })
}




// Rewritten functions for modal down here V
function eventModalMain() {
    // Group the getEvent and modal functions here into one function
    console.log("Modal Main")
    createEventModal()

}


function getEventDetails(date) {
    // Get events for a given date
    return fetch(`events/${date}`)
}


function createEventModal() {
    // Create a modal to display events for a day
    const eventDetailsModal = document.createElement('div')
    eventDetailsModal.setAttribute('id', 'calendar-event-modal')

    // const eventDetailsContainer = document.createElement('div')
    // eventDetailsContainer.classList.add('event-details')

    let calendarEvents = document.querySelectorAll('.day-square')

    calendarEvents.forEach(element => {
        element.addEventListener('click', () => {
            let eventDate = element.getAttribute('data-date')
            let eventDetails = getEventDetails(eventDate)

            addEventDetailsToModal(eventDetails)
            eventDetailsModal.style.display = 'block';
            // eventDetailsModal.appendChild(eventDetailsContainer)
        })
    })

    calendarCon.appendChild(eventDetailsModal)
}



function addEventDetailsToModal(eventDetails) {
    // Add the event details the event details to the modal
    // eventDetails is a promise (hopefully fulfilled)

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

        const eventTitle = document.createElement('h3');
        const eventContent = document.createElement('p')
        const eventImage = document.createElement('img')
        // const closeModalBtn = document.createElement('h1')
        // closeModalBtn.classList.add('close-modal')

        // eventTitle.innerText = details[i].innerText.split('\n')[2]
        eventTitle.innerText= details[i].title
        eventContent.innerText = 'Join us for some random fun event that is mostly used as a test to see if modal works!'
        // closeModalBtn.innerText = 'X'

        detailModal.appendChild(eventTitle)
        detailModal.appendChild(eventContent)
        detailModal.appendChild(eventImage)
        // detailModal.appendChild(closeModalBtn)

        // eventDetailsModal is the whole modal, not jsut details, close to bnring back the calendar
        let eventDetailsModal = document.getElementById('calendar-event-modal')

        if (i === details.length - 1) {
            const closeModalBtn = document.createElement('h1')
            closeModalBtn.classList.add('close-modal')
            closeModalBtn.innerText = 'X'
            detailModal.appendChild(closeModalBtn)
            closeModal(eventDetailsModal, closeModalBtn, detailModal)
        }
        // closeModal(eventDetailsModal, closeModalBtn, detailModal)

        eventDetailsModal.appendChild(detailModal)
    }


}
// When the calendar button is hit int he navbar, load the calendar and all it's functions
calendarBtn.addEventListener('click', () => {
    calendarCon.innerHTML = ''
    addCalendar()
    // addEventModal() // Moving to inside getEventDetails()
    // addEventToCalendar(eventsDict)
    addEventDetailListeners()
    createEventModal()
    // getEventDetails('8_1_2021')
})

