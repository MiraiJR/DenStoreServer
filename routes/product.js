const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/productController')

router.post('/', ProductController.createProduct)
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProduct)
router.get('/search/:datasearch', ProductController.getProductsFollowingDataSearch)
router.get('/category/:category', ProductController.getProductsFollowingCategory)
router.get('/search/get/all', ProductController.getProducts)

module.exports = router