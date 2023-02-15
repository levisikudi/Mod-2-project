const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
})
 let id = params.productId
 console.log(params.productId);

 let container = document.querySelector('#container')

 const getSingleItem = async () =>{
    let response = await fetch(`http://localhost:4001/get_specific_product/${id}`)
    console.log({response});

    let finalData = await response.json()

    console.log(finalData);

    let itemName = document.getElementById('item-name')
    itemName.textContent = finalData.name

    /// Display objects

    

 container.innerHTML = `
 <div id="product-form">
        <label for="name">Product name: </label>
        <input type="text" value =${finalData.name} id="product-name"><br><br>

        <label for="image">Image Url: </label>
        <input type="text" value =${finalData.imageURL} id="image-URL"><br><br>
        
        <label for="price">Price: </label>
        <input type="number" value =${finalData.price} id="price"><br><br>
        
        <label for="price">Quantitiy: </label>
        <input type="number" value =${finalData.quantity} id="quantity"><br><br>

        <label for="description">Description</label><br><br>
        <textarea id="description-text"rows="4"  cols="50" > ${finalData.description} </textarea><br><br>
    </div>
 `

}
getSingleItem()

let submitbutton = document.getElementById('submit-button')

submitbutton.addEventListener('click', async () =>{
    // select the values from the DOM
    let name = document.getElementById('product-name').value
    let description = document.getElementById('description-text').value
    let price = +document.getElementById('price').value
    let imageURL = document.getElementById('image-URL').value
    let quantity = +document.getElementById('quantity').value
     
    let product = {
        name,
        description,
        quantity,
        price,
        imageURL,
        quantity
    }
   
    console.log(JSON.stringify(product));

    let response = await fetch(`http://localhost:4001/update_product/${id}`,
    {
        method:'PUT',
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

   window.location.href = `../product_page?productId=${id}`
    
})
 
 