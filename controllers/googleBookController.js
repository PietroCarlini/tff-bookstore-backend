const googleBookService = require('../services/googleBookService');

const googleBookController = {
    search: async (req, res) => {
        try{
            //*NB: query: Key-value pairs, such as /search?q=harry+potter → req.query.q is 'harry potter'. Used for optional/variable data (filters, searches, pagination).
            const { q } = req.query;
            const books = await googleBookService.searchBooks(q)
            
            if(books === null){
                res.status(404).json({status: 404, message: 'No item found'})
                return
            }

            res.status(200).json(books);
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' });
            console.log(err);
        }
    },

    getDetails: async (req, res) => {
        try{
            //Parts of the URL itself, defined in the router as :parameterName; /books/:volumeId → /books/wrOQLV6xB-wC, req.params.volumeId is “wrOQLV6xB-wC”. They are used when that value exactly identifies a specific resource (a single book in this case)
            const {volumeId} = req.params;
            const book =  await googleBookService.getBookDetails(volumeId);
            res.status(200).json({ book });
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' });
            console.log(err);
        }
    }
}
module.exports = googleBookController;