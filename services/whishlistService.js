const db = require('../models/config');

const wishlistService = {

    add: async (clientId, bookToAdd) => {
        try {
            // findOrCreate: if the client already has this book in "to read", it is not added again
            const [book] = await db.Wishlist.findOrCreate({
                where: { ISBN: bookToAdd.ISBN, clientId },
                defaults: { ...bookToAdd, clientId },
            });
            return book;
        }
        catch (err) {
            throw new Error(err.message);
        }
    },

    getAllByClient: async (clientId) => {
        try {
            const books = await db.Wishlist.findAll({ where: { clientId } });
            return books;
        }
        catch (err) {
            throw new Error(err.message);
        }
    },

    // removes every row of this book for this client (it also cleans any duplicate already in the database)
    remove: async (ISBN, clientId) => {
        try {
            const deleted = await db.Wishlist.destroy({ where: { ISBN, clientId } });
            if (deleted === 0) {
                return null
            }
            return { ISBN };
        }
        catch (err) {
            throw new Error(err.message)
        }
    }
}
module.exports = wishlistService;