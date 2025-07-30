const Product = require('../models/productModel')
const asyncHandler = require('../middleware/asyncHandler')

const getProducts =  asyncHandler(async (req, res) =>{
    const products = await Product.find({})
    res.json(products)
})

const getProductByID = asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id)
    res.json(product)
})


module.exports = {getProducts, getProductByID}