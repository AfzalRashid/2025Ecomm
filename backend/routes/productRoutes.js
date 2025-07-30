const express = require('express');
const router = express.Router();
const {getProducts, getProductByID} = require('../controllers/productController')

router.route('/').get(getProducts);

router.route('/:id').get(getProductByID)

module.exports = router; // ✅ Fixed export
