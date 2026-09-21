const db = require('../models/config');

const bookTrackingService = {

    // marks a book as read: it is added to "read" (once) and it leaves the "to read" list
    add: async (clientId, bookToAdd) => {
        const t = await db.sequelize.transaction();

        try {
            // findOrCreate: if the client already has this book in "read", it is not added again
            const [book] = await db.BookTracking.findOrCreate({
                where: { ISBN: bookToAdd.ISBN, clientId },
                defaults: { ...bookToAdd, clientId },
                transaction: t,
            });

            // a read book is no longer "to read"
            await db.Wishlist.destroy({
                where: { ISBN: bookToAdd.ISBN, clientId },
                transaction: t,
            });

            await t.commit();
            return book;
        }
        catch (err) {
            await t.rollback();
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

    // removes every row of this book for this client (it also cleans any duplicate already in the database)
    remove: async (ISBN, clientId) => {
        try {
            const deleted = await db.BookTracking.destroy({ where: { ISBN, clientId } });
            if (deleted === 0) {
                return null;
            }
            return { ISBN };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = bookTrackingService;