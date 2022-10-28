const Product = require("../models/Product")
const User = require("../models/User")

class ProductController {
    //@route POST api/products
    //@desc create product
    //@access private
    async createProduct(req, res) {
        const {productname, memory, price, saleoff, color, productimage, description, state, category, firm} = req.body

        try {
            const newProduct = new Product({
                productname,
                memory,
                price,
                saleoff,
                color,
                productimage,
                description,
                state: state || "STOCKING",
                category,
                firm
            })

            await newProduct.save()

            return res.status(200).json({success: true, message: "create product successfully!"})
        } catch (error) {
            return res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    //@route POST api/products 
    //@desc get products
    //@access public
    async getProducts(req, res) {
        try {
            const products = await Product.find({})
            
            return res.status(200).json({success: true, message: "get products successfully!", data: products})
        } catch (error) {
            return res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async getProductsFollowingCategory(req, res) {
        try {
            let category = ""
            
            if(req.params.category == "mobile") {
                category = "ĐIỆN THOẠI"
            }else if(req.params.category == "ipad") {
                category = "IPAD"
            } else if(req.params.category == "watch") {
                category = "ĐỒNG HỒ"
            }

            const products = await Product.find({category})

            return res.status(200).json({success: true, message: "get products successfully!", data: products})
        } catch (error) {
            return res.status(500).json({success: false, message: "Internal server error"})
        }
    }

    async getProductsFollowingDataSearch(req, res) {
        try {
            const products = await Product.find({productname: {$regex: `${req.params.datasearch}`}})

            return res.status(200).json({success: true, message: "get products successfully!", data: products})
        } catch (error) {
            return res.status(500).json({success: false, message: "Internal server error"})
        }
    }

    //@route GET api/products/:id
    //@desc get product
    //@access public
    async getProduct(req, res) {
        try {
            const product = await Product.findOne({_id: req.params.id})
            
            if(!product) {
                return res.status(401).json({success: false, message: "Product is not found"})
            }

            return res.status(200).json({success: true, message: "Product is found", data: product})
        } catch (error) {
            return res.status(500).json({success: false, message: 'Internal server error'})
        }
    }
}

module.exports = new ProductController()