
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
    let leftContainer = document.getElementById('left')
    let rightSection = document.getElementById('right')
    let quantity = finalData.quantity ? finalData.quantity : 'OUT OF STOCK'
    
    leftContainer.innerHTML = `
        <img src=${finalData.imageURL} alt=${finalData.name}><br/><br/>
    `

    rightSection.innerHTML = `
    <div id='product-container'>

        <h1>${finalData.name}</h1>
        <span id="price">$${finalData.price}</span><br/><br/>
        <span id='out_of_stock'>${quantity}</span><br/>
        <p id="description">${finalData.description}</p>
        <span id='quantity'>${quantity} left </span>
        <button id="buy-button">BUY ONE</button><br/><br/>  
        <button id="delete-button">Delete item</button>
        <button id="edit-item">Edit Product</button>
    
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
    let editButton = document.getElementById('edit-item')
    editButton.addEventListener('click', (event) =>{
        console.log(event.target);
        window.location.href = `../edit_page?productId=${id}`
    })
    
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
    
    //Remove one functionality

    buyButton.addEventListener('click', async () =>{
    
        let getResponse = await fetch(`http://localhost:4001/get_specific_product/${id}`)
        console.log({getResponse});
    
        let finalData = await getResponse.json()
    
        console.log(finalData);
    
        let newQuantity = finalData.quantity - 1
        
    
        let response = await fetch(`http://localhost:4001/update_one/?productId=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({quantity: newQuantity})
        })

        location.reload();
    })

}
getSingleItem()




let homePageLink = document.getElementById('product_page')
homePageLink.addEventListener('click', ()=>{
    window.location.href = '../'
})

let searchButton = document.getElementById('search-button')

searchButton.addEventListener('click', async () =>{

    let searchContent = document.getElementById('site-search').value 
    console.log(searchContent);
    
     if (searchContent !== '') {
        let response = await fetch(`/search_product_by_name/${searchContent}`);
        let finaldata = await response.json();

        console.log(finaldata);

        if (finaldata.length > 0) {
            window.location.href = `../product_page?productId=${finaldata[0]._id}`
        }
        }
})

let createItemLink = document.getElementById('create_product_page')
createItemLink.addEventListener('click', () =>{
    window.location.href = '../create_page'
})

