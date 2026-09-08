const argon2 = require("argon2");
const authService = require('../services/authService')

const authController = {
    register: async (req, res) => {
        try {
            //Cutting off confirmedPassword (from validator)
            const { confirmPassword, ...userToAdd } = req.data;

            //!hashing PW
            const passwordToHash = await argon2.hash(userToAdd.password);
            userToAdd.password = passwordToHash;

            if (await authService.authEmailCheck(userToAdd.email)) {
                res.status(409).json({ message: 'CONFLICT: chosen email already exist' })
            }
            else {
                const userAdded = await authService.register(userToAdd);
                //NB: userAdded = {user,client}
                const {user, client} = userAdded;
                //! DESTRUCTURING to hide password
                const { password, ...userNoPW} = user.toJSON();

                res.location(`/auth/` + user.id);
                res.status(201).json({userNoPW , client})
            }
        }
        catch (err) {
            res.status(500).json({ status: 500, message: 'A server error has occured' })
            console.log(err);
            
        }
    }
}


module.exports = authController;