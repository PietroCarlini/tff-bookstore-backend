const argon2 = require('argon2');
const userService = require('../services/userService');

const userController = {

    updateProfile: async (req,res) => {
        const userId = req.user.id;
        const dataToUpdate = req.data;
        const userToUpdate = await userService.updateProfile(userId, dataToUpdate);

        try{
            if(!userToUpdate) {
                return res.status(400).json({ status: 400, message: 'Data inserted not found' })
            }

        
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' })
            console.log(err);
    }

}