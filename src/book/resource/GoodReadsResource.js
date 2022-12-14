const axios = require('axios')
const xml2js = require('xml2js');

const config = require('../../config')
const HttpError = require('../../framework/error/httpError')


class GoodreadsResource {

    constructor() {
        this.parser = new xml2js.Parser()
    }

    async search({ searchText, page = 1 }) {
        const result = await axios.get(`${config.Goodreads.url}/search/index.xml`, {
            params: {
                q: searchText,
                key: config.Goodreads.key,
                page,
                search: 'all'
            },
            validateStatus: () => true
        })
        if (result.status !== 200) throw new HttpError(result.status, result.statusText)
        const data = await this.parser.parseStringPromise(result.data)
        return this.adaptGoodreadsSearchResults({ data, nextPage: parseInt(page) + 1 })

    }

     adaptGoodreadsSearchResults({ data, nextPage }) {
        const results = data?.GoodreadsResponse?.search[0]?.results[0]?.work?.map(result => {
            return {
                rating: result.average_rating[0]._ ? result.average_rating[0]._ : result.average_rating[0],
                author: result.best_book[0]?.author[0].name[0],
                title: result.best_book[0]?.title[0],
                image: result.best_book[0]?.image_url[0],
                pages: result.books_count[0]?._
            }
        })
        const totalResults = parseInt(data?.GoodreadsResponse?.search[0]['total-results'])
        nextPage = totalResults === 0 || nextPage * 20 > totalResults ? undefined : nextPage

        return {
            totalResults,
            results: results ? results : [],
            nextPage,
        }
    }
}


module.exports = GoodreadsResource