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

    // PATCH /api/bookshops/me -> the logged-in bookshop updates its own data (body already checked by the validator: req.data)
    updateBookshop: async (req, res) => {
        try {
            const bookshop = await bookshopService.update(req.bookshop.id, req.data);
            res.status(200).json({ bookshop });
        }
        catch (err) {
            // the phone number is unique: another bookshop already uses it
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ status: 409, message: 'This phone number is already used by another bookshop' });
            }
            res.status(500).json({ status: 500, message: 'A server error has occured' });
            console.log(err);
        }
    }
}
module.exports = bookshopController;