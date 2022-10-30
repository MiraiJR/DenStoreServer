const Product = require("../models/Product")
const Comment = require("../models/Comment")

class CommentController {
    // @route /api/comments
    // @desc create comment
    // @access public
    async createComment(req, res) {
        const {content, username, email, idproduct} = req.body

        try {
            const newComment = new Comment({
                content,
                username,
                email,
                idproduct
            })
            await newComment.save()

            return res.status(200).json({success: true, message: "create comment successfully!", comment: newComment})
        } catch (error) {
            return res.status(500).json({success: false, message: "Internal server error"})
        }
    }

    // @route /api/comments/:id
    // @desc get comments of product which has id in params
    // @access public
    async getCommentOfProduct(req, res) {
        try {
            const comments = await Comment.find({idproduct: req.params.id})
            
            return res.status(200).json({success: true, message: "get comment of product successfully!", data: comments})
        } catch (error) {
            return res.status(500).json({success: false, message: "Internal server error"})
        }
    }
}

module.exports = new CommentController()