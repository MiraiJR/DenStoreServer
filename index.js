require('dotenv').config()
const express = require('express')
const moongoose = require('mongoose')
const route = require('./routes/index')
const cors = require("cors")

const connectDB = async () => {
    try {
        await moongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@databasemern.oblximh.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })

        console.log('MongoDB connected successfully!')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

// connect database mongodb
connectDB()

const app = express()
app.use(express.json()) // can read json data
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(__dirname + "/"))
// router
route(app)

app.use(cors)

// configure port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))