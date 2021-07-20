const express = require('express')
const router = express.Router();
const Product= require('../models/product');

// let products= [];

router.get('/products', async(req,res) => {
    try {
        const products = await Product.find()
        return res.status(200).json(products)

    }catch (error){
        return res.status(500).json({"error": error})
    }
})

router.post('/products', async(req, res) => {
    try {
        const {product} = req.body;
        const products= await Product.create ({product})
     return res.status(201).json(products)
    }catch (error){
        return res.status(500).json({"error": error})
    }
})

module.exports = router;