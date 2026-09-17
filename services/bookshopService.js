const db = require('../models/config');

const bookshopService = {
    getAll: async () => {
        try {
            const bookshops = await db.Bookshop.findAll({
                attributes: ['id', 'name', 'city', 'address', 'email', 'phone', 'openingHours']
            });
            return bookshops;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = bookshopService;