const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number,
    price: Number,
    imageURL: String
})

const Product = mongoose.model('Product', productSchema)


module.exports = Product;