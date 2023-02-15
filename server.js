const express = require('express')
const mongoose = require('mongoose')
const { create } = require('./models/product')
const Product = require('./models/product')

require('dotenv').config()
const app = express()

//recognise incoming data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//serve the public folder
app.use(express.static('public'));


//connect to mongodb
let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.ztodsr1.mongodb.net/ProductInventory?retryWrites=true&w=majority`


mongoose.set('strictQuery', false);
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});



app.get('/', (req, res) =>{
    res.send("The Server is serving")
})


// /get_products - responds with all products in your collection
app.get('/get_products', async (req, res) =>{
     // get data from backend
     let response = await Product.find({});
     console.log(response);
      //send to front end
     res.json(response)
})


// /get_specific_product/:product_id - responds with one specific product from your collection
app.get('/get_specific_product/:productId', async (req, res) =>{
    let id = req.params.productId

    let response = await Product.findById(id)
    res.send(response)
})



// /create_product - uses information from req.body to make a new product in your collection
app.post('/create_product', async (req, res) =>{
    console.log(req.body);

    // destructure elements from clientside request
    const {name, description, quantity, price, imageURL} = req.body

    let returnedValue = await Product.create({
        name,
        description,
        quantity,
        price,
        imageURL
    })
    console.log(returnedValue);
    returnedValue ? console.log("Success"): console.log("Fail");;
    // take the body and destructure
   res.send("Upload Complete")
})



// /delete_product/ - The product ID should be included in the URL as a query. Example: /delete_product/?productId=63cd55e8b260470b1c1f2cc0
app.delete('/delete_product/:productId', async (req, res) =>{
    let id = req.params.productId
    let response = await Product.deleteOne({_id:`${id}`})
    res.send({data: `deleted ${response.deletedCount} items.`})
})


// /update_product - uses information from req.body to update the specific product




app.listen(4001, () => {
    console.log(`Server is Listening on 4001`)
})