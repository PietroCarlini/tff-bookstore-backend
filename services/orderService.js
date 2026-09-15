const db = require('../models/config');

const orderService = {

    create: async (clientId, orderToAdd) => {
        const { bookshopId, ISBN, title, author, cover_url, message } = orderToAdd;

        const t = await db.sequelize.transaction();

        try {
            const order = await db.Order.create(
                { clientId, bookshopId, message },
                { transaction: t }
            );

            const orderItem = await db.OrderItem.create(
                { orderId: order.id, ISBN, title, author, cover_url, price: null },
                { transaction: t }
            );

            await t.commit();
            return { order, orderItem };
        }
        catch (err) {
            await t.rollback();
            throw new Error(err.message);
        }
    },

    getAllByClient: async (clientId) => {
        try{
            //'orders' is an obj that contains all the data about orders made by a client (tageted by clientId)
            const orders = await db.Order.findAll({
                where : { clientId }, //this is the key that target the Client
                include: [db.OrderItem, db.Bookshop] //the datas of the orders come from both OrderItem(dataOforder) and Bookshop(dataFromBookshop about order)
            });
            return orders;
        }
        catch(err) {
            throw new Error(err.message);
        }
    },

    getAllByBookshop: async (bookshopId) => {
        try {
            const orders = await db.Order.findAll({
                where: { bookshopId },
                include: [db.OrderItem, db.Client]
            })
            return orders;
        }
        catch(err) {
            throw new Error(err.message);
        }
    },

    update: async (id, bookshopId, dataToUpdate) => {
        try{
            const order = await db.Order.findOne({where:{id, bookshopId}})
            if(!order){
                return null;
            }
            await order.update(dataToUpdate);
            return order
        }
        catch (err) {
            throw new Error(err.message)
        }
    }
}

module.exports = orderService;