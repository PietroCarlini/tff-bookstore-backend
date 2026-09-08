//?Layer that communicates with the database via the Models: it contains the functions `authEmailCheck(email)`(checks whether the email already exists) and `register(userData)`(creates the User and Client records in the database). It never receives requests, only raw data.

const db = require('../models/config')

const authService = {
    //? `register` must create two related rows: one in `User` table and one in `Client` table. If it created the `User` first and then, due to some error, the creation of the `Client` failed, it would end up with an “orphaned” `User` in the database without its corresponding `Client`==> to avoid sequalize.TRANSACTION (the creation happens at the same time, if there is an error it rolls back clean)
    register: async (userToAdd) => {

        const t = await db.sequelize.transaction();

        try {
            const user = await db.User.create(userToAdd, { transaction: t });
            //NB: client has an FK linked to User.id => We create a new Object linking User params to Client and adding user_id
            const clientToAdd = {
                firstname: userToAdd.firstname,
                lastname: userToAdd.lastname,
                email: userToAdd.email,
                userId: user.id
            };
            //NB: it's not possibile to pass directly userToAdd to client because it contains parms from 'user' that don't match whith params of 'client'
            const client = await db.Client.create(clientToAdd, { transaction: t });

            await t.commit();
            return { user, client }
        }
        catch (err) {
            await t.rollback();
            throw new Error(err.message)
        }
    },

    authEmailCheck: async (email) => {
        try {
            const existingEmail = await db.User.findOne({ where: { email } });
            if (existingEmail) {
                return true;
            } else {
                return false
            }
        }
        catch (err) {
            throw new Error(err.message)
        }
    }
}

module.exports = authService;