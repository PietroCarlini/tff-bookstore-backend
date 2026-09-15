const orderService = require('../../services/order/orderService');

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
    }
}

module.exports = orderController;