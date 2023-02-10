let homePageLink = document.getElementById('product_page')
let submitbutton = document.getElementById('submit-button')

homePageLink.addEventListener('click', ()=>{
    window.location.href = '../'
})

submitbutton.addEventListener('click', ()=>{
    // select the values from the DOM
    let name = document.getElementById('product-name').value
    let description = document.getElementById('description-text').value
    let price = +document.getElementById('price').value
    let imageURL = document.getElementById('image-URL').value

    let quantity = 0;

    //console.log(name + " " + price + " " + imageURL);

    // attach values to an object
    let product = {
        name,
        description,
        quantity,
        price,
        imageURL
    }

    console.log({product});

    console.log(JSON.stringify(product));





})