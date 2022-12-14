const express = require('express')
const cors = require('cors')

const config = require('./config')
const BookRoutes = require('./book/api/BookRoutes')
const ErrorMiddleWare = require('./framework/error/errorMiddleWare')


const app = express()
app.use(cors())
app.use(ErrorMiddleWare)

BookRoutes.registerRoutes(app)

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`)
})

