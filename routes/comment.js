const express = require("express")
const router = express.Router()

const CommentController = require("../controllers/commentController.js")

router.post("/", CommentController.createComment)
router.get("/:id", CommentController.getCommentOfProduct)

module.exports = router