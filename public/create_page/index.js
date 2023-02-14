let homePageLink = document.getElementById('product_page')
let submitbutton = document.getElementById('submit-button')

homePageLink.addEventListener('click', ()=>{
    window.location.href = '../'
})

submitbutton.addEventListener('click', async () =>{
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

    console.log(JSON.stringify(product));

    let response = await fetch('http://localhost:4001/create_product',
    {
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(product)
    })
    console.log({product});

    let statusLog = document.getElementById('status-log')

    console.log(response);

    if(response.status === 200){
        statusLog.textContent = "Upload Successful"
        statusLog.style.color = "green"
    }else{
        statusLog.textContent = "Upload Unsuccesful"
        statusLog.style.color = "red"
    }

})