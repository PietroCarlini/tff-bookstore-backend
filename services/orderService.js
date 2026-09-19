const db = require('../models/config');
const { Op } = require('sequelize');

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

    getAllByBookshop: async (bookshopId, search) => {
        try {
            const where = {bookshopId}
            
            // if a search term is provided, filter by client (email/name) or book (ISBN/title/author), case-insensitive
            if (search) {
            where[Op.or] = [
                // '$table.column$' = syntax to filter on a column of an included (joined) table
                { '$client.email$': { [Op.iLike]: `%${search}%` } },
                { '$client.firstname$': { [Op.iLike]: `%${search}%` } },
                { '$client.lastname$': { [Op.iLike]: `%${search}%` } },
                { '$orderItems.ISBN$': { [Op.iLike]: `%${search}%` } },
                { '$orderItems.title$': { [Op.iLike]: `%${search}%` } },
                { '$orderItems.author$': { [Op.iLike]: `%${search}%` } },
            ];
        }
            const orders = await db.Order.findAll({
                where,
                include: [db.OrderItem, db.Client],
                order: [['createdAt', 'DESC']] // newest first, and a stable order after every PATCH
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