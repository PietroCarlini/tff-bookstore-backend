const bookshopService = require('../services/bookshopService');

const bookshopController = {
    getAll: async (req, res) => {
        try {
            const bookshops = await bookshopService.getAll();
            res.status(200).json({ bookshops })
        }
        catch(err) {
            res.status(500).json({status:500, message: 'A server error has occured'});
            console.log(err);
        }
    }
}
module.exports = bookshopController;