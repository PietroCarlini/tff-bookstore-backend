const bookTrackingService = require('../services/bookTrackingService');

const bookTrackingController = {
    add: async (req, res) => {
        try {
            const clientId = req.client.id;
            const bookToAdd = req.data;
            const book = await bookTrackingService.add(clientId, bookToAdd);
            res.status(201).json({ book });
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' });
            console.log(err);
        }
    },

    getMine: async (req, res) => {
        try {
            const clientId = req.client.id;
            const books = await bookTrackingService.getAllByClient(clientId);
            res.status(200).json({ books });
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' });
            console.log(err);
        }
    },

    remove: async (req, res) => {
        try {
            const clientId = req.client.id;
            const { isbn } = req.params;
            const book = await bookTrackingService.remove(isbn, clientId);
            if (!book) {
                return res.status(404).json({ status: 404, message: 'Book not found in tracking list' });
            }
            res.status(200).json({ book });
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' });
            console.log(err);
        }
    }
}

module.exports = bookTrackingController;