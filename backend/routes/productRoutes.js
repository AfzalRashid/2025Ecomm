const express = require('express');
const router = express.Router();
const {getProducts, getProductByID} = require('../controllers/productController')

router.get('/',getProducts);
router.get('/:id', getProductByID)

module.exports = router; // ✅ Fixed export
