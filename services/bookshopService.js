const db = require('../models/config');

// fields the clients can see: the same everywhere
const BOOKSHOP_ATTRIBUTES = ['id', 'name', 'city', 'address', 'email', 'phone', 'openingHours'];

const bookshopService = {
    getAll: async () => {
        try {
            const bookshops = await db.Bookshop.findAll({
                attributes: BOOKSHOP_ATTRIBUTES
            });
            return bookshops;
        }
        catch (err) {
            throw new Error(err.message);
        }
    },

    // the bookshop updates its own data: the id comes from the logged-in user (never from the body)
    update: async (bookshopId, dataToUpdate) => {
        // an empty opening hours text means "no opening hours": it is stored as null
        const data = { ...dataToUpdate };
        if (data.openingHours === '') {
            data.openingHours = null;
        }

        //NB: the error is NOT wrapped in a new Error here: the controller needs to see its type (e.g. duplicate phone)
        await db.Bookshop.update(data, { where: { id: bookshopId } });

        return db.Bookshop.findByPk(bookshopId, { attributes: BOOKSHOP_ATTRIBUTES });
    }
}

module.exports = bookshopService;