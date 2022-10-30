const Product = require("../models/Product")
const Firm = require("../models/Firm")
const slugify = require("slugify")

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


    // @route GET api/products/category/:category
    // @desc get products following category
    // @access public
    async getProductsFollowingCategory(req, res) {
        try {
            let products = await Product.find({slugcategory: req.params.category})
            
            return res.status(200).json({success: true, message: "get products successfully!", data: products})
        } catch (error) {
            return res.status(500).json({success: false, message: "Internal server error"})
        }
    }

    // @route GET api/products/firm/:namefirm
    // @desc get products following firm
    // @access public
    async getProductsFollowFirm(req, res) {
        try {
            const nameFirm = req.params.namefirm.split("-")[req.params.namefirm.split("-").length - 1]
            const firm = await Firm.findOne({name: nameFirm}).exec()
            const products = await Product.find({firm: firm._id.toHexString()})
            return res.status(200).json({success: true, message: "get products successfully!", data: products})
        } catch (error) {
            return res.status(500).json({success: false, message: "Internal server error"})
        }
    }

    // @route GET api/products/search/:datasearch
    // @desc get products following data search
    // @access public
    async getProductsFollowingDataSearch(req, res) {
        try {
            console.log(slugify(req.params.datasearch, {
                replacement: "-",
                lower: true,
                trim: true,
            }))
            const products = await Product.find({slug: {$regex: `${req.params.datasearch}`}})
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