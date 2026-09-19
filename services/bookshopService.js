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
    },

    // no try/catch on purpose: the controller needs the original Sequelize error (see bookshopContoller) to recognize a duplicated phone (unique constraint) and answer 409 (not 500)
    update: async (bookshopId, dataToUpdate) => {
        const bookshop = await db.Bookshop.findByPk(bookshopId);
        if(!bookshop){
            return null;
        }
        await bookshop.update(dataToUpdate);
        return bookshop
    }

}

module.exports = bookshopService;