const express = require('express')
const mongoose = require('mongoose')
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



// /get_specific_product/:product_id - responds with one specific product from your collection




// /create_product - uses information from req.body to make a new product in your collection




// /delete_product/ - The product ID should be included in the URL as a query. Example: /delete_product/?productId=63cd55e8b260470b1c1f2cc0



// /update_product - uses information from req.body to update the specific product




app.listen(4001, () => {
    console.log(`Server is Listening on 4001`)
})