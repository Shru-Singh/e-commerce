const express = require('express')
const router = express.Router();

let products= [];

router.get('/products', (req,res) => {
    res.send('Add some chips');
})

router.post('/products',(req, res) => {
    try {
        const product = req.body;
        products.push(product);
     return res.status(201).json(products)
    }catch (error){
        return res.status(500).json({"error": error})
    }
})

module.exports = router;