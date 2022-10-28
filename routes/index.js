const authRouter = require('./auth')
const postRouter = require('./post')
const productRouter = require('./product')

function route(app) {
    app.use('/api/auth', authRouter)
    app.use('/api/posts', postRouter)
    app.use('/api/products', productRouter)
}

module.exports = route