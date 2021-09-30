console.log("Loading user account....")

// Single page load all the user information and just switch between divs
const accountHome = document.getElementsByClassName('account-home')[0];
const accountSettings = document.getElementsByClassName('account-settings-container')[0];
const accountCurrentOrders = document.getElementsByClassName('account-current-orders-container')[0];
const accountPastOrders = document.getElementsByClassName('account-archived-orders-container')[0];
const accountWishlist = document.getElementsByClassName('account-wishlist-container')[0];
const accountSeller = document.getElementsByClassName('account-seller-container')[0];

document.addEventListener('DOMContentLoaded', () => {
    ready()
})

function ready() {
    console.log("Ready function loaded")
    addListeners();
}

// Home, current-orders, archived-orders, wishlist

function loadPage(page) {
    // When an account button is hit, load that content in the page
    console.log("Loading pages")
    if(page === 'account-home') {
        accountHome.style.display = 'block';
        accountCurrentOrders.style.display = 'none';
        accountPastOrders.style.display = 'none';
        accountSettings.style.display = 'none';
        accountWishlist.style.display = 'none'; 
        accountSeller.style.display = 'none';
    }
    else if(page === 'current-orders') {
        accountHome.style.display = 'none';
        accountCurrentOrders.style.display = 'block';
        accountPastOrders.style.display = 'none';
        accountSettings.style.display = 'none';
        accountWishlist.style.display = 'none';
        accountSeller.style.display = 'none';
    }
    else if(page === 'archived-orders') {
        accountHome.style.display = 'none';
        accountCurrentOrders.style.display = 'none';
        accountPastOrders.style.display = 'block';
        accountSettings.style.display = 'none';
        accountWishlist.style.display = 'none';
        accountSeller.style.display = 'none';
    }
    else if(page === 'account-settings') {
        loadUserDetails('admin')
        accountHome.style.display = 'none';
        accountCurrentOrders.style.display = 'none';
        accountPastOrders.style.display = 'none';
        accountSettings.style.display = 'block';
        accountWishlist.style.display = 'none';
        accountSeller.style.display = 'none';
        loadSettings()
    }
    else if(page === 'account-wishlist') {
        accountHome.style.display = 'none';
        accountCurrentOrders.style.display = 'none';
        accountPastOrders.style.display = 'none';
        accountSettings.style.display = 'none';
        accountWishlist.style.display = 'block';
        accountSeller.style.display = 'none';
    }
    else if(page === 'account-seller') {
        accountHome.style.display = 'none';
        accountCurrentOrders.style.display = 'none';
        accountPastOrders.style.display = 'none';
        accountSettings.style.display = 'none';
        accountWishlist.style.display = 'none';
        accountSeller.style.display = 'block';
    }

}

function addListeners() {
    // Attach listeners to the account card links
    // let accountHomeBtns = document.getElementsByClassName('account-home-btn');
    let accountHomeBtns = document.querySelectorAll('.account-home-btn')
    let accountCurrentOrdersCard = document.getElementsByClassName('account-current-orders')[0];
    let accountPastOrdersCard = document.getElementsByClassName('account-archived-orders')[0];
    let accountSettingsCard = document.getElementsByClassName('account-settings')[0];
    let accountWishlistCard = document.getElementsByClassName('account-wishlist')[0];


    accountHomeBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            loadPage('account-home')
        })
    })
    accountCurrentOrdersCard.addEventListener('click', (event) => {
        console.log("Current Orders")
        event.stopPropagation()
        loadPage('current-orders')
    })
    accountPastOrdersCard.addEventListener('click', (event) => {
        event.stopPropagation()
        loadPage('archived-orders');
    })
    accountSettingsCard.addEventListener('click', (event) => {
        event.stopPropagation()
        loadPage('account-settings');
    })
    accountWishlistCard.addEventListener('click', (event) => {
        event.stopPropagation()
        loadPage('account-wishlist')
    })
}  


// Populate the page containers

function loadUserDetails(user) {
    // Fetch the user data

    fetch(`/store/user_details/${user}`)
}

function loadSettings() {
    // Populate the settings div with account user information and the ability for the
    // user to update/add information to their accounts

    //accountSettings is the container to add to
    let detailNum = 5;
    let detailHeaders = ['Name:', 'Email:', 'Password:', 'Shipping Address:', 'Billing Address:']

    let detailsDiv = document.createElement('div')
    let nameDiv = document.createElement('div')
    let emailDiv = document.createElement('div')
    let passwordDiv = document.createElement('div')
    let shippingDiv = document.createElement('div')
    let billingDiv = document.createElement('div')
    
    let editBtn = document.createElement('button')

    let divList = [nameDiv, emailDiv, passwordDiv, shippingDiv, billingDiv]
    // Sub divs/Headers
    for (let i = 0; i < detailNum;i++) {
        console.log("In loop")
        let divHeader = document.createElement('h4')
        let accountDetail = document.createElement('div')

        divHeader.innerText = detailHeaders[i];
        accountDetail.classList.add('account-detail')
        accountDetail.innerText = 'Name/Email/etc'
        accountDetail.append(addEditBtn())

        divList[i].append(divHeader)
        divList[i].append(accountDetail)

        divList[i].classList.add('account-details-card');
        divList[i].classList.add('settings-card')
        detailsDiv.append(divList[i])

    }

    detailsDiv.classList.add('settings-details');

    accountSettings.append(detailsDiv)
}

function addEditBtn () {
    let editBtn = document.createElement('button');
    editBtn.classList.add('account-edit-btn');
    editBtn.classList.add('btn')

    // Add edit detail event Listener
    editBtn.addEventListener('click', () => {
        editDetail(editBtn)
    })
    editBtn.innerText = 'Edit';
    return editBtn;
}

function editDetail(button) {
    // When the edit button is clicked, change setting content to an HTML input, and Edit button into 'Change'
    // Add as a listener to the current Edit Buttions
    if(button.innerText === 'Edit') {
        button.innerText = 'Change'
    } else if(button.innerText === 'Change') {
        button.innerText = 'Edit'
    }
}