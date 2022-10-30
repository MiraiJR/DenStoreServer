const authRouter = require('./auth')
const postRouter = require('./post')
const productRouter = require('./product')
const commentRouter = require('./comment')

function route(app) {
    app.get('/', (req, res) => {
        res.send("welcome");
    })
    app.use('/api/comments', commentRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/posts', postRouter)
    app.use('/api/products', productRouter)
}

module.exports = route