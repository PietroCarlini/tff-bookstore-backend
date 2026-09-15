const bookStockedService = require('../services/bookStockedService');

const bookStockedController = {

    add: async (req, res) => {
        try {
            const bookToAdd = req.data;
            const bookshopId = req.bookshop.id;

            const book = await bookStockedService.create(bookshopId, bookToAdd);

            //res.location doesn't create a route by itself: it's just a REST convention that sets the response header to 'this is the URL of the book you created'
            res.location(`/api/catalogue/${book.id}`)
            res.status(201).json({ book });
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' })
            console.log(err);
        }
    },

    getAll: async (req, res) => {
        try {
            const bookshopId = req.bookshop.id;
            //req.query.search: retrieves the ?search=... parameter from the URL query string ( GET /api/catalogue?search=harry), unlike req.body/req.data, which instead read the request body. 
            // NB: If `search` is not present in the URL, `req.query.search` is simply undefined, and the service already handles that case with the `if (search)` statement in bookStockedService.
            const search = req.query.search;

            const books = await bookStockedService.getAllByBookshop(bookshopId, search);

            res.status(200).json({ books })
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' })
            console.log(err);
        }
    },

    getOne: async (req, res) => {
        try {
            const bookshopId = req.bookshop.id;
            //req.params: reads the dynamic URL segments defined in the route, such as `:id`(GET /api/catalogue/:id). Ex: `GET /api/catalogue/7` = `req.params.id` = 7
            const { id } = req.params;

            const book = await bookStockedService.getByIdScoped(id, bookshopId);

            if (!book) {
                return res.status(404).json({ status: 404, message: 'Book not found' })
            }

            res.status(200).json({ book });
        }
        catch (err){
            res.status(500).json({ status: 500, message: 'A server error has occured' })
            console.log(err);
        }
    },

    updateOne: async (req, res) => {
        try{
            const bookshopId = req.bookshop.id;
            const { id } = req.params;
            const dataToUpdate = req.data
            const book = await bookStockedService.update(id, bookshopId, dataToUpdate);
            if(!book){
                return res.status(404).json({ status: 404, message: 'Book not found' })
            }
            res.status(200).json({ book });
        }
        catch(err){
            res.status(500).json({ status: 500, message: 'A server error has occured' })
            console.log(err);
        }
    },

    delete: async (req, res) => {
        try{
            const bookshopId = req.bookshop.id;
            const { id } = req.params;

            const book = await bookStockedService.remove(id, bookshopId);
            if(!book){
                return res.status(404).json({ status: 404, message: 'Book not found' })
            }
            res.status(200).json({ book });
        }
        catch(err){
            res.status(500).json({ status: 500, message: 'A server error has occured' })
            console.log(err);
        }
    }
}

module.exports = bookStockedController;