const db = require('../models/config');

const bookTrackingService = {

    add: async (clientId, bookToAdd) => {
        try {
            const book = await db.BookTracking.create({ ...bookToAdd, clientId });
            return book;
        }
        catch (err) {
            throw new Error(err.message);
        }
    },

    getAllByClient: async (clientId) => {
        try {
            const books = await db.BookTracking.findAll({ where: { clientId } });
            return books;
        }
        catch (err) {
            throw new Error(err.message);
        }
    },

    remove: async (ISBN, clientId) => {
        try {
            const book = await db.BookTracking.findOne({ where: { ISBN, clientId } });
            if (!book) {
                return null;
            }
            await book.destroy();
            return book;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = bookTrackingService;