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
    }
}
module.exports = bookshopController;