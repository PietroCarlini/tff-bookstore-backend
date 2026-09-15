const db = require('../../models/config');

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
    }
}

module.exports = orderService;