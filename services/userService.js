const db = require('../models/config');

const userService = {

    //updateProfile needs an identifier(userId) and the data to change(userToUpdate)
    updateProfile: async (userId, userToUpdate) => {

        const t = await db.sequelize.transaction();

        try {
            //update needs two params: dataToUpdate(userToUpdate) and options(where: identifies which row to change (User.id = userId) and transaction to modify user&Client toghter)
            const [userCount, userRow] = await db.User.update(
                userToUpdate,
                {
                    where: { id: userId },
                    transaction: t,
                    returning: true
                });
            const clientToUpdate = {
                firstname: userToUpdate.firstname,
                lastname: userToUpdate.lastname,
                email: userToUpdate.email
            };
            //Client PK is its own 'id' (unrelated to User), so we can't use { id: userId } here =>Client and User are linked via the 'userId' FK: that's what identifies the right row to update.
            const [clientCount, clientRow] = await db.Client.update(
                clientToUpdate, 
                { where: { userId }, 
                transaction: t,
                returning: true
                }
            );
            await t.commit();
            return { user: userRow[0], client: clientRow[0] };
        }
        catch (err) {
            await t.rollback();
            throw new Error(err.message)
        }
    }

}

module.exports = userService;