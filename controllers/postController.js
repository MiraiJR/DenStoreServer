const User = require('../models/User')
const Post = require('../models/Post')

class postController {
    // @route POST /api/posts
    // @desc create post
    // @access private
    async createPost(req, res) {
        const {title, description, url, status} = req.body

        // simple validation
        if(!title) {
            return res.status(400).json({success: false, message: "Title is required"})
        }

        try {
            const newPost = new Post({
                title, 
                description, 
                url: (url.startsWith('https:://')) ? url : `https://${url}`,
                status: status || "TO LEARN",
                user: req.userId
            })

            await newPost.save()

            return res.status(200).json({success: true, message: "Happy learning", post: newPost})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, message: "Interval server error"})            
        }
    }

    // @route GET /api/posts
    // @desc read post
    // @access private
    async readPost(req, res) {
        try {
            const posts = await Post.find({user: req.userId}).populate("user", ["username"])
            return res.status(200).json({success: true, posts})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, message: "Internal server error"})
        }
    }
    
    // @route PUT /api/posts/:id
    // @desc update post
    // @access private
    async updatePost(req, res) {
        const {title, description, url, status} = req.body

        // simple validation
        if(!title) {
            return res.status(400).json({success: false, message: "Title is required"})
        }

        try {
            let updatedPost = {
                title, 
                description: description || "", 
                url: ((url.startsWith('https:://')) ? url : `https://${url}`) || "",
                status: status || "TO LEARN"
            }

            const postUpdateCondition = {_id: req.params.id, user: req.userId}

            updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, {new: true})

            // user not authorised to update post or post not found
            if(!updatedPost) {
                return res.status(401).json({success: false, message: "Post not found or user not authorised"})
            }

            return res.json({success: true, message: "Excellent progress!!!", post: updatedPost})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, message: "Interval server error"})            
        }
    }

    // @route DELETE /api/posts
    // @desc delete post
    // @access private
    async deletePost(req, res) {
        try {
            const postDeleteCondition = {_id: req.params.id, user: req.userId}
            const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

            // user not authorised or post not found 
            if(!deletedPost) {
                return res.status(401).json({success: false, message: "Post not found or user not authorised"})
            }

            return res.json({success: true, post: deletedPost})
        } catch (error) {
            
        }
    }
}

module.exports = new postController()