const bookshopService = require('../services/bookshopService');

const bookshopController = {
    getAll: async (req, res) => {
        try {
            const bookshops = await bookshopService.getAll();
            res.status(200).json({ bookshops })
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' });
            console.log(err);
        }
    },

    // GET /api/bookshops/me -> data of the logged-in bookshop (already attached to req by requireBookshop)
    getBookshopDetails: async (req, res) => {
        try {
            const { id, name, city, address, email, phone, openingHours } = req.bookshop;
            res.status(200).json({ bookshop: { id, name, city, address, email, phone, openingHours } });
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' });
            console.log(err);
        }
    },

    updateBookshopDetails: async (req, res) => {
        try {
            const bookshopId = req.bookshop.id;
            const dataToUpdate = req.data;
            const bookshopToUpdate = await bookshopService.update(bookshopId, dataToUpdate);

            if (!bookshopToUpdate) {
                return res.status(404).json({ status: 404, message: 'Bookshop not found' })
            }

            const { id, name, city, address, email, phone, openingHours } = bookshopToUpdate;
            res.status(200).json({ bookshop: { id, name, city, address, email, phone, openingHours } });
        }
        catch (err) {
            // the phone column has a UNIQUE constraint: Sequelize throws this error when another bookshop already uses that number
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ status: 409, message: 'CONFLICT: this phone number is already used by another bookshop' })
            }
            res.status(500).json({ status: 500, message: 'A server error has occured' })
            console.log(err);
        }
    }
}
module.exports = bookshopController;