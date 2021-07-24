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
        const produce= await Product.find()
     return res.status(200).json(produce)
    }catch (error){
        return res.status(500).json({"error": error})
    }
})

router.delete('/products/:id', async (req, res)=> {
     try {
         const _id=req.params.id ;
         const products= await Product.deleteOne({_id})
         console.log(req.params)
         if(products.deletecount === 0) {
         return res.status(404).json({})
         }else{
              const produce = await Product.find()
             return res.status(200).json(produce)
         }
     }catch (error) {
         return res.status(500).json({"error": error})
     }
})

module.exports = router;