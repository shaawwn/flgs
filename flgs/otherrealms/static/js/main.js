console.log("Loading scripts....")

// Globals
const contentContainer = document.querySelector('#content-container')
const calendar = document.querySelector('#calendar-container')
const contact = document.querySelector('#contact-container')
const linkContainer = document.querySelector('#link-container')
const postContainer = document.querySelector('#post-container')


function loadLinkContainerContent() {
    // Create the image links for the sidebar on the front page
    const wh40kImage = document.createElement('img')
    const collectiblesImage = document.createElement('img')
    const mtgImage = document.createElement('img')
    const comicsImage = document.createElement('img')

    wh40kImage.classList.add('link-image')
    collectiblesImage.classList.add('link-image')
    mtgImage.classList.add('link-image')
    comicsImage.classList.add('link-image')

    wh40kImage.src = '/static/images/40k_logo.jpeg'
    // wh40kImage.setAttribute('src', '{% static "images/40k_logo.jpeg" %}')
    // collectiblesImage.setAttribute('src', '{% static "images/collectibles.jpeg" %}')
    // mtgImage.setAttribute('src', '{% static "images/mtg_logo.jpeg" %}')
    // comicsImage.setAttribute('src', '{% static "images/comics %}')


    linkContainer.appendChild(wh40kImage)
    // linkContainer.appendChild(collectiblesImage)
    // linkContainer.appendChild(mtgImage)
    // linkContainer.appendChild(comicsImage)
}

function loadHome() {
    calendar.style.display = 'none';
    contact.style.display = 'none';
    contentContainer.style.display = 'flex';
    
}
function loadCalendar() {
    // Load thr calender when the calender link is clicked
    contentContainer.style.display = 'none';
    contact.style.display = 'none';
    calendar.style.display = 'block';
}

function loadContact() {
    contentContainer.style.display = 'none';
    calendar.style.display = 'none';
    contact.style.display = 'flex';
}

function addEventListeners() {
    const calendarBtn = document.getElementsByName('calendar')[0]
    const homeBtn = document.getElementsByName('home')[0]
    const contactBtn = document.getElementsByName('contact')[0]

    homeBtn.addEventListener('click', () => {
        loadHome()
    })

    calendarBtn.addEventListener('click', () => {
        loadCalendar()
    })

    contactBtn.addEventListener('click', () => {
        loadContact()
    })
}


addEventListeners()
// loadLinkContainerContent()