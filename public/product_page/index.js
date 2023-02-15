const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
})
 let id = params.productId
 console.log(params.productId);
 
// use id to get info from collection

const getSingleItem = async () =>{
    let response = await fetch(`http://localhost:4001/get_specific_product/${id}`)
    console.log({response});

    let finalData = await response.json()

    console.log(finalData);


    //display items
    let container = document.getElementById('container')
    let quantity = finalData.quantity ? finalData.quantity : 'OUT OF STOCK'

    container.innerHTML = `
    <div class="product-box">
        <h1>${finalData.name}</h1>
        <img src=${finalData.imageURL} alt=${finalData.name}><br/><br/>
        <p id="description">${finalData.description}</p>
        <span id="price">$${finalData.price}</span><br/><br/>
        <button id="buy-button">BUY ONE</button><br/><br/>
        <span id='quantity'>${quantity} left </span>
        <span id='out_of_stock'>${quantity}</span><br/>
    
    </div>
    `
    let buyButton = document.getElementById('buy-button')
    let itemQuantity = document.getElementById('quantity')
    let outOfStock = document.getElementById('out_of_stock')
    //if quantity = out of stock
    if(finalData.quantity <= 0){
        //hide buy button
        buyButton.classList.add('hidden')
        //hide quantity
        itemQuantity.classList.add('hidden')
        //enable out of stock
        outOfStock.classList.remove('hidden')
        
    } else{
        //enable buy button
        buyButton.classList.remove('hidden')
        // enable quantity
        itemQuantity.classList.remove('hidden')
        // hide out of stock    
        outOfStock.classList.add('hidden')
    }
    

}
getSingleItem()



let deleteButton = document.getElementById('delete-button')

deleteButton.addEventListener('click', async () =>{

    let response = await fetch(`http://localhost:4001/delete_product/${id}`, {
        method: "delete",
    });
    // console.log(response);
    
    let parsedData = await response.json()
    console.log(parsedData);
    window.location.href = '../index.html'
})

let editButton = document.getElementById('edit-item')

editButton.addEventListener('click', (event) =>{
    console.log(event.target);
    window.location.href = `../edit_page?productId=${id}`
})


let homePageLink = document.getElementById('product_page')
homePageLink.addEventListener('click', ()=>{
    window.location.href = '../'
})



