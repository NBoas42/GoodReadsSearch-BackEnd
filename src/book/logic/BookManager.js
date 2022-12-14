const GoodReadsResource = require('../resource/GoodReadsResource')



class BookManager {
    constructor() {
        this.goodReadsResource = new GoodReadsResource()
    }

    async searchBooks({ searchText, page }) {
        const results = await this.goodReadsResource.search({ searchText,page })
        return results
    }

}


module.exports = BookManager