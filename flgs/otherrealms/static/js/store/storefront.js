console.log("Storefront scripts are loading....")

// TEMP FUNCTIONS

document.getElementsByClassName('header-image-container')[0].addEventListener('click', () => {
    console.log("Redirecting...")
})

function ready() {
    // Main script funciton, put other functions inside and load from here
    document.addEventListener('DOMContentLoaded', () => {
        console.log("Page loaded.")
    })
    addEventListeners()
}

function clickProduct(productName) {
    // Load function when event (click) is triggered on product
    // GET/FETch
    let productLink = productName.split(" ").join("_")

    console.log(`${productLink} clicked....`)
}

function addEventListeners() {
    // Add event listeners to DOM elements
    const products = document.getElementsByClassName('product-card')
    
    for (let i=0; i<products.length; i++) {
        // console.log(products[i].dataset.productName)
        // Need to format the product name so it is useable as a link
        products[i].addEventListener('click', ()=> {
            clickProduct(products[i].dataset.productName)
        })
    }
}

ready()