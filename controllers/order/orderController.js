const orderService = require('../../services/orderService');

const orderController = {
    create: async (req, res) => {
        try {
            const clientId = req.client.id;
            const orderToAdd = req.data;
            const { order, orderItem } = await orderService.create(clientId, orderToAdd);
            res.status(201).json({ order, orderItem });
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' });
            console.log(err);
        }
    },

    getMine: async (req, res) => {
        try{
            const clientId = req.client.id;
            const orders = await orderService.getAllByClient(clientId);
            res.status(200).json({ orders })
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' });
            console.log(err);
        }
    },

    getBookshopOrders: async (req, res) => {
        try {
            const bookshopId = req.bookshop.id;
            const orders = await orderService.getAllByBookshop(bookshopId);
            res.status(200).json({ orders });
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' });
            console.log(err);
        }
    },

    update: async (req, res) => {
        try{
            const bookshopId = req.bookshop.id;
            const { id } = req.params;
            const dataToUpdate = req.data;
            const order = await orderService.update(id, bookshopId, dataToUpdate);
            if(!order){
                return res.status(404).json({ status: 404, message: 'Order not found' })
            }
            res.status(200).json({ order })
        }
        catch(err){
            res.status(500).json({ status: 500, message: 'A server error has occured' })
            console.log(err);
        }
    }

}

module.exports = orderController;