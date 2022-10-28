const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()

const postController = require('../controllers/postController')
const {verifyToken} = require('../middleware/auth')

router.post('/',  verifyToken,postController.createPost)
router.get('/', verifyToken, postController.readPost)
router.put('/:id', verifyToken, postController.updatePost)
router.delete('/:id', verifyToken, postController.deletePost)

module.exports = router