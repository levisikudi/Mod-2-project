console.log("Hello There");

let createProdNav = document.getElementById('create_product_page')
let container = document.getElementById('container')


createProdNav.addEventListener('click', ()=>{
    window.location.href = './create_page'
})

const getData = async () =>{
    let data = await fetch('/get_products');
    data.json().then((parsedData) =>{

        parsedData.forEach(element => {
            
            let productContainer = document.createElement('div');
            productContainer.className = 'product-box'

            let titleTag = document.createElement('h2');
            let imageTag = document.createElement('img');
            let priceTag = document.createElement('p');

            imageTag.src = element.imageURL
            priceTag.textContent = `Price: $${element.price}`
            titleTag.textContent = element.name
            titleTag.id = element._id
            productContainer.appendChild(titleTag)
            productContainer.appendChild(imageTag)
            productContainer.appendChild(priceTag)
            container.appendChild(productContainer)
            console.log({element})

            titleTag.addEventListener('click', (event) =>{
                console.log({event});
                console.log(event.target);
                window.location.href = `./product_page?productId=${event.target.id}`
            })

        });
    })
}

getData()

