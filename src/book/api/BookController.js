const BookManager = require('../logic/BookManager')


class BookController {

    constructor(){
        this.bookManger = new BookManager()
    }

    async searchBooks(request){
        const searchText = request.query.searchText
        const page = request.query.page
        const results =  await this.bookManger.searchBooks({searchText,page})
        return {
            statusCode:200,
            data:results
        }
            
        
    }
}


module.exports = BookController