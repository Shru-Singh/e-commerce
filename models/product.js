const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
        product: {
               type: String,
               required: true
           },
})


module.exports = mongoose.model('product', ProductSchema)