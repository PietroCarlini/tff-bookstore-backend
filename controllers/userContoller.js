const argon2 = require('argon2');
const userService = require('../services/userService');

const userController = {

    updateProfile: async (req, res) => {
        const userId = req.user.id;
        const dataToUpdate = req.data;

        try {
            const userToUpdate = await userService.updateProfile(userId, dataToUpdate);
            if (!userToUpdate) {
                return res.status(400).json({ status: 400, message: 'Data inserted not found' })
            }
            else {
                const { password, ...updatedUserNoPW } = userToUpdate.toJSON();
                res.status(200).json(updatedUserNoPW)
            }
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' })
            console.log(err);
        }
    }
}

module.exports = userController;