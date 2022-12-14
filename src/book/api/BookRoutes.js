const BookController = require('./BookController')
const bookController = new BookController()

module.exports = {
    registerRoutes: (app) => {
        app.get('/v1/book/search', async (request, response, next) => {
            try {
                const result = await bookController.searchBooks(request)
                response.status(result.statusCode).send(result)
            } catch (error) {
                next(error)
            }
        })
    }
}