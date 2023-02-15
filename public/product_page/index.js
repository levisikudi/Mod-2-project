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

    let itemName = document.getElementById('item-name')
    itemName.textContent = finalData.name


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





// let backButton = document.getElementById('back-to-items-btn')
// // backButton.addEventListener('click', ()=>{
// //     window.location.href = '../index.html'
// // })
